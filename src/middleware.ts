import { differenceInMilliseconds, differenceInSeconds } from "date-fns";
import moment from "moment";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const privateRouter = ["/dashboard", "/me", "/settings", "/v1/api/token/refresh-token"];
const authRouter = ["/login", "/register", "/"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
      const { pathname } = request.nextUrl;

      const access_token = request.cookies.get("next_access_token")?.value;
      const refresh_token = request.cookies.get("next_refresh_token")?.value;
      const client_id = request.cookies.get("next_client_id")?.value;
      const expire_token = request.cookies.get("next_expire_token")?.value;
      const expire_cookie = request.cookies.get("next_expire_cookie")?.value;
      const code_verify_token = request.cookies.get("next_code_verify_token")?.value;

      const authentication = !!client_id && !!access_token && !!refresh_token;
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-url", pathname);
      const response = NextResponse.next({
            headers: requestHeaders,
      });

      const regexUrlFormEdit = /^\/form\/[a-zA-Z0-9]+\/edit$/;
      const regexUrlFormShare = /^\/form\/[a-zA-Z0-9]+\/share$/;
      const regexUrlFormSummary = /^\/form\/[a-zA-Z0-9]+\/summary$/;
      const regexUrlFormDownload = /^\/form\/[a-zA-Z0-9]+\/download$/;
      const now = new Date();
      const exprireTokenTime = new Date(expire_token as string);
      const expireCookieTime = new Date(expire_cookie as string);

      console.log({result: differenceInMilliseconds(exprireTokenTime, now) < 0, expireCooke:expire_cookie, code_verify_token})

      if (expire_token && differenceInMilliseconds(exprireTokenTime, now) < 0) {
            const response = NextResponse.next();



            if(expire_cookie && differenceInMilliseconds(expireCookieTime, now) < 0) {


            return NextResponse.redirect(new URL('/login', request.url));

            }
           

            const url = `/refresh-token?code_verify_token=${code_verify_token}`

            // return NextResponse.redirect(url);
            return NextResponse.redirect(new URL(url, request.url))
      }

      if (pathname === "/" && !authentication) {
            return NextResponse.redirect(new URL("/login", request.url));
      }

      if (pathname === "/" && authentication) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (
            (regexUrlFormEdit.test(pathname) ||
                  regexUrlFormSummary.test(pathname) ||
                  regexUrlFormDownload.test(pathname) ||
                  regexUrlFormShare.test(pathname)) &&
            !authentication
      ) {
            return NextResponse.redirect(new URL("/login", request.url));
      }

      if (!authentication && privateRouter.includes(pathname)) {
            return NextResponse.redirect(new URL("/login", request.url));
      }

      if (authentication && authRouter.includes(pathname)) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (authentication && pathname === "/") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return response;
}

// See "Matching Paths" below to learn more
export const config = {
      matcher: ["/dashboard", "/settings", "/me", "/login", "/register", "/", "/form/:path*", "/v1/api/token/refresh-token"],
};
