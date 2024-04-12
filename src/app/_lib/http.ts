import { ResponseApi, ResponseLogin } from "../_schema/api/response.shema";
import { LoginType } from "../_schema/auth/login.schema";
import { AUTHORIZATION_ERROR_STATUS } from "./httpError";
import { normalizePath } from "./utils";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type CustomRequest = Omit<RequestInit, "method"> & {
	baseUrl?: string;
};

class ClientToken {
	private _access_token: string = "";
	private _refresh_token: string = "";
	private _id: string = "";

	set id(id: string) {
		if (typeof window !== undefined) {
			this._id = id;
		}
	}

	get id() {
		return this._id;
	}

	set accessToken(at: string) {
		if (typeof window !== undefined) {
			this._access_token = at;
		}
	}

	get accessToken() {
		return this._access_token;
	}

	set refreshToken(rf: string) {
		if (typeof window !== undefined) {
			this._refresh_token = rf;
		}
	}

	get refreshToken() {
		return this._access_token;
	}
}

export const clientToken = new ClientToken();

/**
 *
 * @param method phương thức HTTP
 * @param url endpoint
 * @param options các options
 */

export const resquest = async <Response>(method: Method, url: string, options?: CustomRequest | undefined) => {
	console.log({ clientToken });

	const body = options?.body
		? options.body instanceof FormData
			? options.body
			: JSON.stringify(options.body)
		: undefined;

	const baseHeader =
		options?.body instanceof FormData
			? { Authorization: `Bearer ${clientToken.accessToken}`, "x-client-id": clientToken.id }
			: {
					Authorization: `Bearer ${clientToken.accessToken}`,
					"Content-Type": "application/json",
					"x-client-id": clientToken.id,
			  };

	console.log({ baseHeader, options: options });
	const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_BACK_END_URL : options.baseUrl;

	const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

	const response = await fetch(fullUrl, {
		...options,
		headers: {
			...baseHeader,
			...options?.headers,
		} as any,
		body,
		method,
	});

	const payload: Response = await response.json();
	console.log({ payload, url });
	const data = {
		status: response.status,
		metadata: payload,
	};

	if (!response.ok) {
		console.log({ response });
		if (+response.status === AUTHORIZATION_ERROR_STATUS) {
			if (typeof window !== undefined) {
			}
		}
	}

	if (["v1/api/auth/login", "v1/api/auth/register"].some((path) => path === normalizePath(url))) {
		console.log({ normal: true, url: normalizePath(url) });
		clientToken.accessToken = (payload as ResponseApi<ResponseLogin>).metadata.token.access_token;
		clientToken.refreshToken = (payload as ResponseApi<ResponseLogin>).metadata.token.refresh_token;
		clientToken.id = (payload as ResponseApi<ResponseLogin>).metadata.user._id;
	}

	console.log({ normal: false, url: normalizePath(url) });
	if (["v1/api/auth/logout"].includes(normalizePath(url))) {
		clientToken.accessToken = "";
		clientToken.refreshToken = "";
		clientToken.id = "";
		console.log({ http: clientToken });
	}

	return payload;
};

class Http {
	static get<Response>(url: string) {
		const method: Method = "GET";
		return resquest<Response>(method, url);
	}

	/**
	 *
	 * @param url endPoint
	 * @param body body
	 * @param options
	 * @returns
	 */
	static post<Response>(url: string, body: any, options: Omit<CustomRequest, "body"> = {}) {
		const method: Method = "POST";
		console.log({ options });
		return resquest<Response>(method, url, { ...options, body });
	}

	static put<Response>(url: string, body: any, options: Omit<CustomRequest, "body">) {
		const method: Method = "PUT";
		return resquest<Response>(method, url, { ...options, body });
	}

	static delete<Response>(url: string) {
		const method: Method = "DELETE";
		return resquest<Response>(method, url);
	}
}

export default Http;
