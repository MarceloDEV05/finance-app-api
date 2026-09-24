import  { badRequest } from '../controllers/helper.js'

export class UpdateUserController {
    async execute(httpRequest){
        const updateUserParams = httpRequest.body;

        const allowedFields = ['first_name', 'last_name', 'email', 'password'];

        const someFieldIsNotAllowed = Object.keys(updateUserParams).some( (field) => !allowedFields.includes(field))

        if(!someFieldIsNotAllowed){
            return badRequest({
                message: 'some provided field is not allowed',
            })
        }
    }
}