import { getAllianceClient } from "../../../../services/alliance";

export async function POST(request: Request) {
  const { event, groupId, traits, userId, value } = await request.json();
  const alliance = getAllianceClient();

  const errors = [];
  if (typeof event !== "string") { errors.push('Invalid event'); }
  if (!(typeof value === "number" || typeof value === "undefined")) { errors.push('Invalid value'); }
  if (!(typeof groupId === "string" || typeof groupId === "undefined")) { errors.push('Invalid groupId'); }
  if (!(typeof traits === "object" || typeof traits === "undefined")) { errors.push('Invalid traits'); }
  if (typeof userId !== "string") { errors.push('Invalid userId'); }
  if (errors.length) {
    return Response.json({ errors }, { status: 403 });
  }

  try {
    const sdk = groupId ? alliance.startRound(groupId) : alliance;

    await sdk.track(userId, event, value, traits);
    await alliance.flush();

    return Response.json({ success: true });
  } catch (err) {
    console.log('error', err);
    return Response.json({ error: "failed" }, { status: 500 });
  }
}
