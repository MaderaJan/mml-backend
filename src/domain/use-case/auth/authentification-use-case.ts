import env from '@main/config/env'
import constants from '@main/config/constants'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default class AuthentificationUseCase {

    generateAuthToken(userId: string, spotifyAccessToken: String): string {
        const token = jwt.sign({
            userId: userId,
            spotifyAccessToken: spotifyAccessToken
        }, env.jwt_secret)

        return token
    }

    validateToken(authorizationHeader: string): [string, string] {
        try {
            const authorization = authorizationHeader.replace('Bearer ', '')
            const decodedToken = jwt.verify(authorization, env.jwt_secret) as JwtPayload

            const userId = decodedToken[constants.userId]
            const spotifyAccessToken = decodedToken[constants.spotifyAccessToken]

            if (!userId) {
                throw new Error("id property not found")
            }

            if (!spotifyAccessToken) {
                throw new Error("token property not found")
            }

            return [userId, spotifyAccessToken]
        } catch (error) {
            console.log(error)
            throw new Error("Error during validation process")
        }
    }
}