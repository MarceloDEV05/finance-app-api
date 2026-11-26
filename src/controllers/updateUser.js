import { UpdateUserUseCase } from '../use-cases/updateUser.js';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
  emailAlreadyInUseResponse,
  invalidPasswordResponse,
  badRequest,
} from './helpers/index.js';


export class UpdateUserController {
  async execute(httpRequest) {
    const userId = httpRequest.params.userId;
    const params = httpRequest.body;

    const allowedFields = ['first_name', 'last_name', 'email', 'password'];

    const someFieldIsNotAllowed = Object.keys(params).some(
      (field) => !allowedFields.includes(field),
    );

    const passwordIsValid = checkIfPasswordIsValid(params.password);
    if (!passwordIsValid) {
      return invalidPasswordResponse();
    }

    const emailIsValid = checkIfEmailIsValid(params.email);
    if (!emailIsValid) {
      return emailAlreadyInUseResponse();
    }

    if (!someFieldIsNotAllowed) {
      return badRequest({
        message: 'some provided field is not allowed',
      });
    }

    const updateUser = new UpdateUserUseCase();
    const updatedUser = updateUser.execute(userId, params);

    return updatedUser;
  }
}
