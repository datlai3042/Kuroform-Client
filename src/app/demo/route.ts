export async function GET(request: Request) {
	console.log("get");
	return Response.json("hello world");
}
