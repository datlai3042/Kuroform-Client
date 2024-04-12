import Http from "@/app/_lib/http";
import Auth from "@/app/auth/auth";
import { cookies } from "next/headers";

export async function POST() {
	const access_token = cookies().get("access_token")?.value;
	const _id = cookies().get("_id")?.value;

	if (!_id) throw new Error("Không có user_id");
	if (!access_token) throw new Error("Không có access token");

	console.log({ _id, access_token });

	const response = await Http.post<{ message: string }>(
		"/v1/api/auth/logout",
		{ force: true },
		{ headers: { Authorization: `Bearer ${access_token}`, "x-client-id": _id } as unknown as HeadersInit }
	);

	console.log({ response });

	if (response) {
		cookies().delete("_id");

		cookies().delete("access_token");
		cookies().delete("refresh_token");
	}
	return Response.json({ auth: true });
}
