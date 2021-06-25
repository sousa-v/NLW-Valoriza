import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs"

import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserSerfvice {
  async execute ({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories)
    if (!email){
      throw new Error("Email incorrect")
    }

    if (!password){
      throw new Error("Password incorrect")
    } 

    const user = await userRepositories.findOne({email})

    if(!user) {
      throw new Error("Email/Password incorrect")
    }

    const passwordMatch =  await compare(password, user.password)

    if(!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    const token = sign(
      { email: user.email },
      "6b39bef9e657cda0883cb36f82729a6b",
      { subject: user.id, expiresIn: "1d" }
    )

    return token
  }
}

export { AuthenticateUserSerfvice }