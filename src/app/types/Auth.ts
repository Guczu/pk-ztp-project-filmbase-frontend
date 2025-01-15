export type Auth = {
    accessToken: string;
    refreshToken: string;
    userId: number;
}

export type User = {
    id: number;
    username: string;
}

export type DecodedToken = {
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    sub: string;
}