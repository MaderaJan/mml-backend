import express, { Express } from 'express'
import setupRoutes from "@main/config/routes"
import axios from 'axios'

import { AppDataSource } from '@infrastructure/spotify/db/app-data-source'

import SpotifyLoginUseCase from '@domain/user-case/spotify-login-use-case'
import SpotifyRepository from '@infrastructure/spotify/spotify-repostiory'


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

const spotifyRepository = new SpotifyRepository(axios)
const spotifyLoginUseCase = new SpotifyLoginUseCase(spotifyRepository)

export default (): Express => {
    const app = express()
    setupRoutes(app, spotifyLoginUseCase)
    return app
} 