import Auth from "@/app/auth/auth";

export async function GET() {
	Auth.onLogin();

	return Response.json(
		{ auth: Auth.isAuthentication },
		{
			headers: { "Set-Cookie": `isAuthencation=${true};Path=/;httpOnly` },
		}
	);
}
