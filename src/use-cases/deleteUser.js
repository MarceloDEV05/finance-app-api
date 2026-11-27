export class DeleteUserUseCase {
    constructor(deleteUserRepository){
        this.DeleteUserRepository = deleteUserRepository;
    }
  async execute(userId) {

    const deletedUser = await this.DeleteUserRepository.execute(userId);
    return deletedUser;
  }
}
