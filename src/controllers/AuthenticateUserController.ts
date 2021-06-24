import { Request, Response } from "express";
import { AuthenticateUserSerfvice } from "../services/AutthenticateUserService";


class AuthenticateUserController {
 async handle(request: Request, response: Response) {
  const { email, password } = request.body

  const authenticateUserSerfvice = new AuthenticateUserSerfvice()

  const token = await authenticateUserSerfvice.execute({
    email,
    password
  })

  return response.json(token)
 }
 
}

export { AuthenticateUserController }