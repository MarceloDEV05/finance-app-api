export class GetUserByIdUseCase {
  constructor(getUserByIdRepository) {
    this.GetUserByIdRepository = getUserByIdRepository;
  }
  async execute(userId) {
    const user = await this.GetUserByIdRepository.execute(userId);
    return user;
  }
}
