import { Axios } from "axios";
import { Account } from "./db/entity/account";
import { AppDataSource } from '@infrastructure/spotify/db/app-data-source'

class SpotifyRepository {

    axios: Axios

    constructor(axios: Axios) {
        this.axios = axios
    }

    getAccessRefreshToken(requestData: SpotifyAccessTokenRequest, token: string): Promise<SpotifyAccessTokenRespnse> {
        return this.axios.post<SpotifyAccessTokenRespnse>('https://accounts.spotify.com/api/token', requestData, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${token}`,
            }
        }).then(res => res.data)
    }

    getUser(accessToken: string): Promise<SpotifyUserResponse> {
        return this.axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        }).then((res) => res.data);
    }

    persistOrUpdateAccount(tokenResponse: SpotifyAccessTokenRespnse, spotifyUserRespose: SpotifyUserResponse): Promise<boolean> {
        const account: Account = new Account({
            user_id: "TODO GENERATE USER ID",
            spotify_id: spotifyUserRespose.id,
            access_token: tokenResponse.access_token,
            refresh_token: tokenResponse.refresh_token,
            email: spotifyUserRespose.email,
            display_name: spotifyUserRespose.display_name,
        })

        return AppDataSource.manager.save(account)
            .then(() => true)
            .catch(() => false)
    }
}

export default SpotifyRepository

