import { DeleteUserRepository } from '../repositories/postgres/deleteUser.js';

export class DeleteUserUseCase {
  async execute(userId) {
    const deleteUserRepository = new DeleteUserRepository();

    const deletedUser = await deleteUserRepository.execute(userId);
    return deletedUser;
  }
}
