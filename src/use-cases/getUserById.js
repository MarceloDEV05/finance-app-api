import { PostgresGetUserByIdRepository } from "../repositories/postgres/getUserById";

export class GetUserByIdUseCase {
    async execute() {
        const getUserByIdRepository = new PostgresGetUserByIdRepository();

        const user = await getUserByIdRepository.execute(userId);
        return user;
    }
}