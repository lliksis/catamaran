export interface IAuthToken {
    accessToken: IToken;
    refreshToken: IToken;
    bungieMembershipId: string;
}

export interface IToken {
    token: string;
    expiresOn: number;
}

export interface ILogger {
    debug: (message: string, ...data: any[]) => void;
    warn: (message: string, ...data: any[]) => void;
    error: (message: string, ...data: any[]) => void;
    info: (message: string, ...data: any[]) => void;
}
