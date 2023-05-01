import { Express, Router } from 'express'
import SpotifyLoginUseCase from '@domain/user-case/spotify-login-use-case'

export default (app: Express, spotifyLoginUseCase: SpotifyLoginUseCase) => {
    const router = Router()

    app.get('/health', (req, res) => {
        res.status(200)
            .json({
                message: "Everything is oke now!"
            })
    })

    app.get('/login', (_, res) => {
        res.redirect(spotifyLoginUseCase.getSpotifyLoginUrl())
    })

    app.get('/callback', (req, res) => {
        spotifyLoginUseCase.loginSpotifyUser(req.query.code as string)
            .then((loginSuccessful) => {
                res.status(200)
                    .json({
                        message: "User successfully aquired" + loginSuccessful
                    })
            })
    })

    app.use(router)
}