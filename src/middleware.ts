import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Auth from "./app/auth/auth";
import { cookies } from "next/headers";

const privateRouter = ["/dashboaard"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const isAuthentication = Boolean(request.cookies.get("isAuthentication")?.value);
	console.log("middlewares", request.nextUrl.pathname, request.cookies, isAuthentication);
	const response = NextResponse.next();

	if (!isAuthentication) {
		response.cookies.set({
			name: "isAuthentication",
			value: "false",
			path: "/",
			httpOnly: true,
		});
		// response.cookies.set("isAuthentication", "false");
	}

	if (!isAuthentication && privateRouter.includes(pathname)) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	// if (isAuthentication && pathname === "/") {
	// 	return NextResponse.redirect(new URL("/dashboard", request.url));
	// }

	return response;
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/dashboard", "/login"],
};
