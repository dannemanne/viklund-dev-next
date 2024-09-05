export async function POST(request: Request) {
  const body = await request.json();
  console.log(JSON.stringify(body));
  return Response.json({ success: true });
}
