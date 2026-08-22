import { PostgresGetUserByEmailRepository} from '../repositories/postgres/getUserByEmail.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import bcrypt from 'bcrypt';

export class UpdateUserUseCase{
    async execute(userId, UpdateUserParams){
        if( UpdateUserParams.email){
            const postgresGetUserByEmailRepository = new PostgresGetUserByEmailRepository();

            const userWithProviderEmail = await postgresGetUserByEmailRepository.execute(
                UpdateUserParams.email, 
            )

            if(userWithProviderEmail){
                throw new EmailAlreadyInUseError(UpdateUserParams.email)
            }
        }

        const user = {
            ...UpdateUserParams,
        }

        if(UpdateUserParams.password){
            const hashedPassord = await bcrypt.hash(UpdateUserParams.password, 10)

            user.password = hashedPassord;
        }
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
        const updateUser = await PostgresUpdateUserRepository.execute(userId, user);

        return updateUser;
    }
}