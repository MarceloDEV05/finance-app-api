import {
  checkIfIdIsValid,
  invalidIdResponse,
  serverError,
  ok,
  notFound,
} from './helpers/index.js';

export class DeleteUserController {
    constructor(deletedUserUseCase){
        this.DeletedUserUseCase = deletedUserUseCase;
    }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = checkIfIdIsValid(userId);

      if (!idIsValid) {
        return invalidIdResponse();
      }

      const deletedUser = await this.DeletedUserUseCase.execute(userId);

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
