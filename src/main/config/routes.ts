import { Express, Router } from 'express'

import spotifyAuthMiddleWare from '@main/config/spotify-auth-middleware'

import SpotifyLoginUseCase from '@domain/use-case/spotify/spotify-login-use-case'
import SpotifyGetAlbumsUseCase from '@domain/use-case/spotify/spotify-get-albums-use-case'
import constants from './constants'

export default (app: Express, spotifyLoginUseCase: SpotifyLoginUseCase, spotifyGetAlbumsUseCase: SpotifyGetAlbumsUseCase) => {
    const router = Router()

    app.get('/health', (req, res) => {
        res.status(200)
            .json({
                message: "Everything is oke now!"
            })
    })

    app.get('/login', (_, res) => {
        res.redirect(spotifyLoginUseCase.getLoginUrl())
    })

    app.get('/callback', (req, res) => {
        spotifyLoginUseCase.loginUser(req.query.code as string)
            .then((authToken) => {
                return res.status(200)
                    .json({
                        message: "User successfully aquired, here is authToken: " + authToken
                    })
            }).catch(error => {
                return res.status(400)
            })
    })

    app.get('/albums', spotifyAuthMiddleWare, (req, res) => {
        const spotifyAccessToken = res.locals[constants.spotifyAccessToken]
        const albums = spotifyGetAlbumsUseCase.getAlbums(spotifyAccessToken)

        res.status(200)
            .json({
                message: "Did i get Albums: " + albums
            })
    })

    app.post('/album/{id}/rate', (req, res) => {
        // TODO AUTH
        // TODO save rate for album into DB for user
    })

    app.use(router)
}