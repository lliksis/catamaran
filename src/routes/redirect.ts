import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { fetchAuthToken } from '$lib/api/utils';

/** @type {import('./__types/[id]').RequestHandler} */
export const put: RequestHandler = async ({ request }) => {
	const code = await request.text();
	const authToken = await fetchAuthToken(code);
	return {
		headers: {
			'Set-Cookie': cookie.serialize('authToken', JSON.stringify(authToken), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			})
		}
	};
};
