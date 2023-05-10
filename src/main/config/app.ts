import express, { Express } from 'express'
import setupRoutes from "@main/config/routes"
import axios from 'axios'

import { AppDataSource } from '@infrastructure/spotify/db/app-data-source'

import SpotifyLoginUseCase from '@domain/use-case/spotify/spotify-login-use-case'
import SpotifyGetAlbumsUseCase from '@domain/use-case/spotify/spotify-get-albums-use-case'
import SpotifyRepository from '@infrastructure/spotify/spotify-repostiory'
import AuthentificationUseCase from '@domain/use-case/auth/authentification-use-case'

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const spotifyGetAlbumsUseCase = new SpotifyGetAlbumsUseCase()
const authentificaitonUseCase = new AuthentificationUseCase()
const spotifyRepository = new SpotifyRepository(axios)
const spotifyLoginUseCase = new SpotifyLoginUseCase(spotifyRepository, authentificaitonUseCase)

export default (): Express => {
    const app = express()
    setupRoutes(app, spotifyLoginUseCase, spotifyGetAlbumsUseCase)
    return app
}