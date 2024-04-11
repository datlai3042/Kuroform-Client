import Auth from "@/app/auth/auth";
import { cookies } from "next/headers";

export async function POST() {
	// Auth.onLogin();
	// cookies().set({
	// 	name: "isAuthentication",
	// 	value: "true",
	// 	httpOnly: true,
	// 	path: "/",
	// });
	// headers: { "Set-Cookie": `isAuthencation=${true};Path=/;httpOnly` },
	return Response.json(
		// { auth: Auth.isAuthentication },
		"",
		{
			headers: { "Set-Cookie": `isAuthentication=${true}; httpOnly;Path=/` },
		}
	);
}
