export interface IAuthToken {
    accessToken: IToken;
    refreshToken: IToken;
    bungieMembershipId: string;
}

export interface IToken {
    token: string;
    expiresOn: number;
}
