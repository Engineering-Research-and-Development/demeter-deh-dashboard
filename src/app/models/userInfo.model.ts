export interface UserInfo {
    access_token: string,
    expires: Date,
    valid: string,
    User: {
        scope: string[],
        id: string,
        username: string,
        email: string,
        date_password: string,
        enabled: boolean,
        admin: boolean,
        roles: string[],
    };
}