import { getAllianceClient } from "../../../services/alliance";

export default async function handler (req, res) {
  const { event, groupId, traits, userId, value } = req.body;
  const alliance = getAllianceClient();

  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  const errors = [];
  if (typeof event !== "string") { errors.push('Invalid event'); }
  if (!(typeof value === "number" || typeof value === "undefined")) { errors.push('Invalid value'); }
  if (!(typeof groupId === "string" || typeof groupId === "undefined")) { errors.push('Invalid groupId'); }
  if (!(typeof traits === "object" || typeof traits === "undefined")) { errors.push('Invalid traits'); }
  if (typeof userId !== "string") { errors.push('Invalid userId'); }
  if (errors.length) {
    res.status(403).send({ errors });
    return;
  }

  try {
    const sdk = groupId ? alliance.startRound(groupId) : alliance;

    await sdk.track(userId, event, value, traits);
    await alliance.flush();

    res.status(200).send({ success: true });
  } catch (err) {
    console.log('error', err);
    res.status(500).send({ error: "failed" });
  }
}
