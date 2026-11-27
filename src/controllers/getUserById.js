import validator from 'validator';
import { invalidIdResponse, ok } from './helpers/index.js';

export class GetUserByIdController {
  constructor(getUserByIdUseCase){
    this.GetUserByIdUseCase = getUserByIdUseCase;
  }
  async execute(httpRequest) {
    try {
      const isIdValid = validator.isUUID(httpRequest.params.userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.GetUserByIdUseCase.execute(httpRequest.params.userId);

      return ok(user);
    } catch (error) {
      console.error(error);
    }
  }
}
