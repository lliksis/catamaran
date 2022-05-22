export interface IAuthToken {
	accessToken: IToken;
	refreshToken: IToken;
	bungieMembershipId: string;
}

export const stringify = (token: any) => {
	for (const key in token) {
		if (Object.prototype.hasOwnProperty.call(token, key)) {
			token[key] = JSON.stringify(token[key]);
		}
	}
	return JSON.stringify(token);
};

export interface IToken {
	token: string;
	expiresOn: number;
}
