import { v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../Repositories/postgres/create-user';


export class CreateUserUseCase {
    async execute(createUserParams) {
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