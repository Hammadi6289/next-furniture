import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).json({ message: "Sign-in required." });
  }

  switch (req.method) {
    case "GET":
      try {
        await db.connect();
        const orders = await Order.find({}).populate("user", "name");
        await db.disconnect();
        return res.status(200).json(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        await db.disconnect();
        return res.status(500).json({ message: "Internal Server Error" });
      }

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
