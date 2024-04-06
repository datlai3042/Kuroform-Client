import Auth from "@/app/auth/auth";
import { cookies } from "next/headers";

export async function GET() {
	cookies().delete("isAuthencation");

	return Response.json({ auth: true });
}
