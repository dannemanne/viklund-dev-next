import { getAllianceClient } from "../../../services/alliance";

export default async function handler (req, res) {
  const { address, userId } = req.body;
  const alliance = getAllianceClient();

  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  const errors = [];
  if (typeof userId !== "string") { errors.push('Invalid userId'); }
  if (errors.length) {
    res.status(403).send({ errors });
    return;
  }

  try {
    if (address) {
      console.log('set', userId, address)
      await alliance.setUserIdentifiers(userId, { walletAddress: address });
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log('start', userId)
    await alliance.startGame(userId);
    await alliance.flush();
    res.status(200).send({ success: true });
  } catch (err) {
    console.log('error', err);
    res.status(500).send({ error: "failed" });
  }
}
