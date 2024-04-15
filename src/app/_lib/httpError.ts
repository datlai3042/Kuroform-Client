/**
      401 -> token hết hạn
      403 -> refresh token hết hạn
 */

type ErrorPayload = {
	message: string;
	detail: string;
	[key: string]: any;
};

type ConstructorError = {
	status?: number;
	payload: ErrorPayload;
};

export const AUTHORIZATION_ERROR_STATUS = 401;
export const PERMISSION_ERROR_STATUS = 403;

class HttpError extends Error {
	protected status: number;
	protected payload: ErrorPayload;

	constructor({ status = 500, payload }: ConstructorError) {
		super(`Http Error with ${status}`), (this.status = status);
		this.payload = payload;
	}
}

class AuthorizationError extends HttpError {
	status = AUTHORIZATION_ERROR_STATUS;
	payload: ErrorPayload;

	constructor({ status = AUTHORIZATION_ERROR_STATUS, payload }: ConstructorError) {
		super({ status, payload });
		this.payload = payload;
	}
}

class PermissionError extends HttpError {
	status = PERMISSION_ERROR_STATUS;
	payload: ErrorPayload;

	constructor({ status = PERMISSION_ERROR_STATUS, payload }: ConstructorError) {
		super({ status, payload });
		this.payload = payload;
	}
}

export type { ErrorPayload, ConstructorError };
export { HttpError, AuthorizationError, PermissionError };
