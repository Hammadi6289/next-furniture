import Order from "../../../models/Order";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Session:", session);

  if (!session) {
    return res.status(401).json({ message: "Signin required" });
  }

  console.log("Session:", session); // Log session object

  // Extract user ID from session token
  const userId = session._id;
  console.log("Extracted User ID:", userId);

  if (!userId) {
    return res.status(400).json({ message: "User ID not found in session" });
  }

  await db.connect();

  try {
    // Create a new order instance with request body and user ID
    const newOrder = new Order({
      ...req.body,
      user: userId, // Ensure user ID is correctly assigned
    });

    // Save the new order to the database
    const order = await newOrder.save();

    // Send a successful response with the order data
    res.status(201).json(order);
  } catch (error) {
    // Handle any errors that occur during the order creation
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  } finally {
    // Disconnect from the database
    await db.disconnect();
  }
};

export default handler;
