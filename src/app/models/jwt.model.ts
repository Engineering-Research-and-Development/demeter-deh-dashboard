import { Role } from "./role";

export interface JwtModel {
    organizations: string[],
    displayName: string,
    roles: Role[],
    app_id: string,
    trusted_apps: string[],
    isGravatarEnabled: boolean,
    email: string,
    id: string,
    authorization_decision: string,
    app_azf_domain: string,
    eidas_profile: {},
    username: string,
    type: string,
    iat: number,
    exp: number
}