import { getAllianceClient } from "../../../../services/alliance";

export async function POST(request: Request) {
  const { address, userId } = await request.json();
  const alliance = getAllianceClient();

  const errors = [];
  if (typeof userId !== "string") { errors.push('Invalid userId'); }
  if (errors.length) {
    return Response.json({ errors }, { status: 403 });
  }

  try {
    if (address) {
      await alliance.setUserIdentifiers(userId, { walletAddress: address });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await alliance.startGame(userId);
    await alliance.flush();
    return Response.json({ success: true });
  } catch (err) {
    console.log('error', err);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
