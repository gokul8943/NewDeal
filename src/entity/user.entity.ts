export class UserEntity {
    public readonly id: string
    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    public readonly phone: number;
    public readonly profilePicture: string;
    public readonly isSupervisor: boolean;
    constructor(
        id: string,
        username: string,
        email: string,
        password: string,
        phone: number,
        profilePicture: string,
        isSupervisor: boolean
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.profilePicture = profilePicture;
        this.isSupervisor = isSupervisor
    }
}