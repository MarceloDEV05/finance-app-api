import { DeleteUserUseCase } from '../use-cases/deleteUser.js';
import {
  checkIfIdIsValid,
  invalidIdResponse,
  serverError,
  ok,
  notFound,
} from './helpers/index.js';

export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = checkIfIdIsValid(userId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const deleteUser = new DeleteUserUseCase();
      const deletedUser = await deleteUser.execute(userId);

      if (!deletedUser) {
        return notFound();
      }

      return ok(deletedUser);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
