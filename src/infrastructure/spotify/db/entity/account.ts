import { Column, Entity, PrimaryColumn } from "typeorm"


@Entity()
export class Account {

    @PrimaryColumn()
    user_id: string

    @PrimaryColumn()
    spotify_id: string

    @Column()
    access_token: string

    @Column()
    refresh_token: string

    @Column()
    email: string

    @Column()
    display_name: string

    constructor({
        user_id,
        spotify_id,
        access_token,
        refresh_token,
        email,
        display_name,
    }: {
        user_id: string,
        spotify_id: string,
        access_token: string,
        refresh_token: string,
        email: string,
        display_name: string,
    }) {
        this.user_id = user_id
        this.spotify_id = spotify_id
        this.access_token = access_token
        this.refresh_token = refresh_token
        this.email = email
        this.display_name = display_name
    }
}