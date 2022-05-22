import { variables } from '$lib/variables';
import { v4 } from 'uuid';

/**
 * Gets the URL to login into bnet with all params added.
 * @returns The URL as string.
 */
export const getAuthorizationURL = () => {
	const authState = v4();
	// localStorage.setItem("authState", authState);

	const queryParams = new URLSearchParams({
		client_id: variables.CLIENT_ID,
		response_type: 'code',
		state: authState
	});

	return `https://www.bungie.net/en/OAuth/Authorize?${queryParams}`;
};

const tokenUrl = 'https://www.bungie.net/platform/app/oauth/token/';

/**
 * Refreshes the accessToken with the refreshToken passed.
 * @param refreshToken The locally stored refreshToken.
 */
export const getRefreshedAuthToken = async (refreshToken: string) => {
	const authCode = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);

	const response = await fetch(tokenUrl, {
		method: 'POST',
		body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${authCode}`
		}
	});
	const responseToken = await response.json();
	return mapResponseToToken(responseToken);
};

/**
 * Initial fetches an access token.
 * @param code The code provied by the bnet authorization endpoint.
 */
export const fetchAuthToken = async (code: string) => {
	const authCode = btoa(`${variables.CLIENT_ID}:${variables.CLIENT_SECRET}`);

	const response = await fetch(tokenUrl, {
		method: 'POST',
		body: `grant_type=authorization_code&code=${code}`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${authCode}`
		}
	});
	const responseToken = await response.json();
	const authToken = mapResponseToToken(responseToken);
	return authToken;
};

/**
 * Maps an access token response to the proper type.
 * @param response The response to map (has to be from the bnet token endpoint).
 * @returns The access token as IAuthToken.
 */
const mapResponseToToken = (response: any) => {
	const dateNow = Date.now() / 1000;
	return {
		accessToken: {
			token: response.access_token,
			expiresOn: dateNow + response.expires_in
		},
		refreshToken: {
			token: response.refresh_token,
			expiresOn: dateNow + response.refresh_expires_in
		},
		bungieMembershipId: response.membership_id
	};
};
