import express from 'express';
import 'dotenv/config.js';

import { GetUserByIdController } from './src/controllers/getUserById.js';
import { CreateUserController } from './src/controllers/createUser.js';
import { DeleteUserController } from './src/controllers/deleteUser.js';

import { CreateUserRepository } from './src/repositories/postgres/createUser.js';
import { GetUserByIdRepository } from './src/repositories/postgres/getUserById.js';
import { DeleteUserRepository } from './src/repositories/postgres/deleteUser.js';

import { CreateUserUseCase } from './src/use-cases/createUser.js';
import { GetUserByIdUseCase } from './src/use-cases/getUserById.js';
import { DeleteUserUseCase } from './src/use-cases/deleteUser.js';

const app = express();
const port = 3000;
app.use(express.json());

app.post('/api/users', async (request, response) => {
  const createUserRepository = new CreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(createUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode, body } = await createUserController.execute(request);
  response.status(statusCode).json(body);
});

app.get('/api/users/:userId', async (request, response) => {
  const getUserByIdRepository = new GetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(request);
  response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
  const deleteUserRepository = new DeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);
  const { statusCode, body } = await deleteUserController.execute(request);

  response.status(statusCode).send(body);
});

app.listen(port, () => console.log(`listening in port: ${port} `));
