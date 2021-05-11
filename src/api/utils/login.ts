import { v4 } from "uuid";
import { authStorage } from "./staticStorage";
import type { IAuthToken } from "./types";

/**
 * Gets the URL to login into bnet with all params added
 * @returns The URL as string
 */
export const getAuthorizationURL = () => {
    const authState = v4();
    localStorage.setItem("authState", authState);

    const queryParams = new URLSearchParams({
        client_id: __app.env.CLIENT_ID,
        response_type: "code",
        state: authState,
    });

    return `https://www.bungie.net/en/OAuth/Authorize?${queryParams}`;
};

const tokenUrl = "https://www.bungie.net/platform/app/oauth/token/";

/**
 * Checks if an auth token is already locally stored.
 * If yes and the accesToken is already expired but not the refreshToken, this will fetch a new one.
 * @returns true if a token is locally set or was refreshed. false if none is set or the refreshToken is expired.
 */
export const checkForAuthToken = async () => {
    const localToken = await authStorage.getItem<IAuthToken>("token");
    const dateNow = Date.now() / 1000;

    if (!localToken || dateNow > localToken.refreshToken.expiresOn) {
        return false;
    } else if (dateNow > localToken.accessToken.expiresOn) {
        await refreshAuthToken(localToken.refreshToken.token);
    }
    return true;
};

/**
 * Refreshes the accessToken with the refreshToken passed.
 * @param refreshToken The locally stored refreshToken
 */
export const refreshAuthToken = async (refreshToken: string) => {
    const response = await fetch(tokenUrl, {
        method: "POST",
        body: JSON.stringify({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    const responseToken = await response.json();
    const authToken = mapResponseToToken(responseToken);
    authStorage.setItem("token", authToken);
};

/**
 * Initial fetches an access token.
 * @param code The code provied by the bnet authorization endpoint.
 */
export const fetchAuthToken = async (code: string) => {
    const authCode = btoa(`${__app.env.CLIENT_ID}:${__app.env.CLIENT_SECRET}`);

    const response = await fetch(tokenUrl, {
        method: "POST",
        body: `grant_type=authorization_code&code=${code}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${authCode}`,
        },
    });
    const responseToken = await response.json();
    const authToken = mapResponseToToken(responseToken);
    authStorage.setItem("token", authToken);
};

/**
 * Maps an access token response to the proper type
 * @param response The response to map (has to be from the bnet token endpoint)
 * @returns The access token as IAuthToken
 */
const mapResponseToToken = (response: any) => {
    const dateNow = Date.now() / 1000;
    return {
        accessToken: {
            token: response.access_token,
            expiresOn: dateNow + response.expires_in,
        },
        refreshToken: {
            token: response.refresh_token,
            expiresOn: dateNow + response.refresh_expires_in,
        },
        bungieMembershipId: response.membership_id,
    };
};
