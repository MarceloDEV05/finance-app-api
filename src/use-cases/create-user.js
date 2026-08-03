import { v4 as uuidv4} from 'uuid';

import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/getUserByEmail.js';


export class CreateUserUseCase {
    async execute(createUserParams) {
        const getUserByEmailRepository = new PostgresGetUserByEmailRepository()

        const userWithProvidedEmail = await getUserByEmailRepository.execute( createUserParams.email )

        if(userWithProvidedEmail){
            throw new Error('The provided email is already in use.')
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

        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        return await postgresCreateUserRepository.execute(user);
    }
}