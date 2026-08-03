import { CreateUserUseCase } from "../use-cases/create-user.js";
import validator from "validator"
import { badRequest, created, serverError } from "./helper.js";
export class CreateUserController {
   async execute(httpRequest){
    try{
                //validar requisicao ( campos obrigatorios, email e tamanho de senha)
        const params = httpRequest.body;
        const requiredFields = ["first_name", "last_name", "email", "password"];
        
        for(const field of requiredFields){
            if(!params[field] || params[field].trim().length === 0){
                return badRequest({message:`Missing param: ${field}`})
            }
        }

        const passwordIsValid = params.password.length < 6
        if(passwordIsValid){
            return badRequest({message: "Password must be at least 6 characters"})
        }

        const emailIsValid = validator.isEmail(params.email)
        if(!emailIsValid) {
            return badRequest({message:"Invalid email. Please provide a valid one"})
        }

        // chamar || enviar para o usecase
        const createUserUseCase = new CreateUserUseCase();
        const createdUser = await createUserUseCase.execute(params)

        return created(createdUser)
        //retornar resposta para usuario em status code
    }catch(error) {
        console.error(error)
        return serverError()
    }
  }
}