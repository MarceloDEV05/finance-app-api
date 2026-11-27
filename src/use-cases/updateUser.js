import { GetUserByEmailRepository } from '../repositories/postgres/getUserByEmail.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import bcrypt from 'bcrypt';

export class UpdateUserUseCase {
  constructor(updateUserRepository) {
    this.UpdateUserRepository = updateUserRepository;
  }
  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const getUserByEmailRepository = new GetUserByEmailRepository();

      const userWithProvidedEmail = await getUserByEmailRepository.execute(
        updateUserParams.email,
      );

      if (userWithProvidedEmail) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    const user = {
      ...updateUserParams,
    };

    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10);

      user.password = hashedPassword;
    }

    const updatedUser = await this.updateUserRepository.execute(userId, user);

    return updatedUser;
  }
}
