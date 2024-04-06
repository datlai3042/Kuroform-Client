import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Auth from "./app/auth/auth";

const authentication = ["/dashboard"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isAuthentication = Boolean(request.cookies.get("isAuthencation"));
	console.log(request.nextUrl.pathname, request.cookies);

	if (!isAuthentication && authentication.includes(pathname)) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	if (isAuthentication && pathname === "/") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/dashboard"],
};
