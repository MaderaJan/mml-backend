import SpotifyRepository from '@infrastructure/spotify/spotify-repostiory'
import queryString from 'node:querystring'
import AuthentificationUseCase from '../auth/authentification-use-case'

class SpotifyLoginUseCase {

    spotifyRepository: SpotifyRepository
    authentificaitonUseCase: AuthentificationUseCase

    constructor(
        spotifyRepository: SpotifyRepository,
        authentificaitonUseCase: AuthentificationUseCase
    ) {
        this.spotifyRepository = spotifyRepository
        this.authentificaitonUseCase = authentificaitonUseCase
    }

    readonly REDIRECT_URI = 'http://localhost:8000/callback'
    readonly CLIENT_ID = 'f1c93f2c3bd64faf9c410970d69a1fac'
    readonly CLIENT_SECRET = '56cbee449ddd42efa4a05a21c51bb8bc'
    readonly SCOPE = 'user-read-private user-read-email'

    getLoginUrl(): string {
        return 'https://accounts.spotify.com/authorize?' + queryString.stringify({
            response_type: 'code',
            client_id: this.CLIENT_ID,
            scope: this.SCOPE,
            redirect_uri: this.REDIRECT_URI,
        })
    }

    loginUser(code: string): Promise<string> {
        const token = Buffer.from(this.CLIENT_ID + ':' + this.CLIENT_SECRET).toString('base64')

        const requestData: SpotifyAccessTokenRequest = {
            code: code,
            redirect_uri: this.REDIRECT_URI,
            grant_type: 'authorization_code'
        }

        return this.spotifyRepository.getAccessRefreshToken(requestData, token)
            .then(tokenResponse => {
                return this.spotifyRepository.getUser(tokenResponse.access_token)
                    .then(spotifyUserRespose => {
                        return this.spotifyRepository.persistOrUpdateAccount(tokenResponse, spotifyUserRespose)
                    }).then(userId => {
                        return this.authentificaitonUseCase.generateAuthToken(userId, tokenResponse.access_token)
                    })
            })
    }
}


export default SpotifyLoginUseCase