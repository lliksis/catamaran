import type { HttpClientConfig, ServerResponse } from 'bungie-api-ts/destiny2';
import { PlatformErrorCodes } from 'bungie-api-ts/destiny2';
import { BungieError, HttpStatusError } from '../Errors';
import { authStorage } from './staticStorage';
import type { IAuthToken } from './login';

/**
 * Creates a fetch method for the bungiet-api-ts api.
 * @param withOAuth Flag to indicate if an request should be send with the access token.
 * @returns The fetch method.
 */
export const createFetch = (withOAuth?: boolean) => {
	return async (config: HttpClientConfig) => {
		let url = config.url;
		if (config.params) {
			for (const key in config.params) {
				typeof config.params[key] === 'undefined' && delete config.params[key];
			}
			url += `?${new URLSearchParams(config.params)}`;
		}

		const headers: HeadersInit = {};
		headers['X-API-Key'] = process.env.X_API_KEY ?? '';
		if (config.body) {
			headers['Content-Type'] = 'application/json';
		}

		if (withOAuth) {
			const tokenValue = (
				(await authStorage?.getItem<IAuthToken>('token')) ?? { accessToken: { token: '' } }
			).accessToken.token;
			headers['Authorization'] = `Bearer ${tokenValue}`;
		}

		const request = new Request(url, {
			method: config.method,
			body: config.body ? JSON.stringify(config.body) : undefined,
			headers
		});

		const response = await fetch(request);

		const data: ServerResponse<unknown> = await response.json();
		// Throw an error if Bungies ServerResponse is not successfull.
		// There's an alternate error response that can be returned during maintenance.
		const eMessage = data && (data as any).error && (data as any).error_description;
		if (eMessage) {
			throw new BungieError({
				Message: eMessage,
				ErrorCode: PlatformErrorCodes.DestinyUnexpectedError,
				ErrorStatus: eMessage
			});
		} else if (data.ErrorCode !== PlatformErrorCodes.Success) {
			throw new BungieError(data);
		}

		// Throw an error if the response wasn't successfull.
		if (response.status < 200 || response.status >= 400) {
			throw new HttpStatusError(response);
		}

		return data;
	};
};
