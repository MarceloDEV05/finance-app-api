import { v4 as uuidv4 } from 'uuid';

import bcrypt from 'bcrypt';
import { GetUserByEmailRepository } from '../repositories/postgres/getUserByEmail.js';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class CreateUserUseCase {
  constructor(createUserRepository){
    this.CreateUserRepository = createUserRepository;
  }
  async execute(createUserParams) {
    const getUserByEmailRepository = new GetUserByEmailRepository();

    const userWithProvidedEmail = await getUserByEmailRepository.execute(
      createUserParams.email,
    );

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError();
    }

    //criar id para usuario
    const userId = uuidv4();

    //criptografando senha com bcrypt
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

    //inserir usuario no banco de dados
    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    
    return await this.CreateUserRepository.execute(user);
  }
}
