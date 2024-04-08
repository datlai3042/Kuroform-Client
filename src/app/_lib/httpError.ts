/**
      401 -> token hết hạn
      403 -> refresh token hết hạn
 */

type ErrorMessage = {
	message: string;
	detail: string;
	[key: string]: any;
};

type ConstructorError = {
	status: number;
	payload: ErrorMessage;
};

export const AUTHORIZATION_ERROR_STATUS = 401;
export const PERMISSION_ERROR_STATUS = 403;

class HttpError extends Error {
	protected status: number;
	protected payload: { message: string; detail: string; [key: string]: any };

	constructor({ status, payload }: ConstructorError) {
		super("Http Error"), (this.status = status);
		this.payload = payload;
	}
}

class AuthorizationError extends HttpError {
	status = AUTHORIZATION_ERROR_STATUS;
	payload: ErrorMessage;

	constructor({ status = AUTHORIZATION_ERROR_STATUS, payload }: ConstructorError) {
		super({ status, payload });
		this.payload = payload;
	}
}

class PermissionError extends HttpError {
	status = PERMISSION_ERROR_STATUS;
	payload: ErrorMessage;

	constructor({ status = PERMISSION_ERROR_STATUS, payload }: ConstructorError) {
		super({ status, payload });
		this.payload = payload;
	}
}
