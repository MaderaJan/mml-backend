export default class SpotifyGetAlbumsUseCase {

    getAlbums(token: string): boolean {
        // request spotify albums
        console.log("Spotify access token: " + token)
        return true
    }
}