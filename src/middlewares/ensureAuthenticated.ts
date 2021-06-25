import { NextFunction, Request,Response } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request, 
  response:Response, 
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(token, "6b39bef9e657cda0883cb36f82729a6b") as IPayload

    request.user_id = sub

    return next()
  }catch(err){
    return response.status(401).end()
  }

}