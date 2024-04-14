import { expiresToken } from "@/app/_lib/utils";
import Auth from "@/app/auth/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	const { access_token, refresh_token, _id } = await request.json();

	const expiresAT = expiresToken(access_token);
	const expiresRT = expiresToken(refresh_token);

	cookies().set({
		name: "_id",
		value: _id,
		httpOnly: true,
		path: "/",
		maxAge: expiresAT,
		expires: expiresAT,
	});

	cookies().set({
		name: "access_token",
		value: access_token,
		httpOnly: true,
		path: "/",
		expires: expiresAT,
	});

	cookies().set({
		name: "refresh_token",
		value: refresh_token,
		httpOnly: true,
		path: "/",
		expires: expiresRT,
	});

	return Response.json({ access_token, refresh_token, _id });
}
