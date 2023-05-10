import { Request, Response, NextFunction } from "express";
import constants from '@main/config/constants'
import AuthentificationUseCase from "@domain/use-case/auth/authentification-use-case";

const spotifyAuthMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const authentificationUseCase = new AuthentificationUseCase()
    const [userId, spotifyAccessToken] = authentificationUseCase.validateToken(req.header('Authorization') as string)

    res.locals[constants.userId] = userId
    res.locals[constants.spotifyAccessToken] = spotifyAccessToken

    next()
}

export default spotifyAuthMiddleWare