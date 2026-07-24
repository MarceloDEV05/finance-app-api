import express, { request } from 'express';
import 'dotenv/config.js';
import { CreateUserController } from './src/controllers/create-user.js';
import { GetUserByIdController } from './src/controllers/getUserById.js';

const app = express();
const port = 3000;
app.use(express.json());

app.post('/api/users', async(request, response) => {
    const createUserController = new CreateUserController();

    const {statusCode, body} = await createUserController.execute(request);
    response.status(statusCode).json(body);
})

app.get("/api/users/:userId", async(request, response) => {
    const getUserByIdController = new GetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(request)
    response.status(statusCode).send(body);
})

app.listen(port, () => console.log(`listening in port: ${port} `));
