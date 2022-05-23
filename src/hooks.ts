import type { Handle, RequestEvent } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { fetchAuthToken, getRefreshedAuthToken, IAuthToken } from '$lib/api/utils';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const code = event.url.searchParams.get('code');
	if (event.url.pathname.startsWith('/redirect') && code) {
		const authToken = await fetchAuthToken(code);
		event.locals.authToken = authToken;
		response.headers.set(
			'set-cookie',
			cookie.serialize('authToken', JSON.stringify(event.locals.authToken), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			})
		);
	}

	if (event.url.pathname.startsWith('/app')) {
		const cookies = cookie.parse(event.request.headers.get('cookie') || '');
		const authCookie = cookies['authToken'];

		if (!authCookie) {
			return Response.redirect(event.url.origin, 303);
		}

		let authToken: IAuthToken = JSON.parse(authCookie);
		const dateNow = Date.now() / 1000;
		if (!authToken || dateNow > authToken.refreshToken.expiresOn) {
			return Response.redirect(event.url.origin, 303);
		} else if (dateNow > authToken.accessToken.expiresOn) {
			authToken = await getRefreshedAuthToken(authToken.refreshToken.token);
		}
		event.locals.authToken = authToken;

		response.headers.set(
			'set-cookie',
			cookie.serialize('authToken', JSON.stringify(event.locals.authToken), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			})
		);
	}

	return response;
};

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = (event: RequestEvent) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const authCookie = cookies['authToken'];
	return { authToken: authCookie ? JSON.parse(authCookie) : undefined };
};
