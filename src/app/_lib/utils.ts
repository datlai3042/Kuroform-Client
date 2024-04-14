import { jwtDecode } from "jwt-decode";

export const validateEmail = (email: string) => {
	const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
	return email.match(regex);
};

export const normalizePath = (url: string) => {
	return url.startsWith("/") ? url.slice(1) : url;
};

export const expiresToken = (token: string) => {
	const decode = jwtDecode<JwtPayload>(token);
	const expires = new Date(decode.exp * 1000);
	return Number(expires);
};
