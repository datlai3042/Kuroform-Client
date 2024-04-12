import Auth from "@/app/auth/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	const { access_token, refresh_token, _id } = await request.json();

	cookies().set({
		name: "_id",
		value: _id,
		httpOnly: true,
		path: "/",
	});

	cookies().set({
		name: "access_token",
		value: access_token,
		httpOnly: true,
		path: "/",
	});

	cookies().set({
		name: "refresh_token",
		value: refresh_token,
		httpOnly: true,
		path: "/",
	});

	return Response.json({ access_token, refresh_token, _id });
}
