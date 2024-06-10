//import Order from "@/models/Order";
//import db from "@/utils/db";
import { getSession } from "next-auth/react";
import Order from "../../../../models/Order";
import db from "../../../../utils/db";

const getOrderByIdHandler = async (req, res) => {
  try {
    // Get user session
    const session = await getSession({ req });

    // Check if user is authenticated
    if (!session) {
      return res.status(401).json({ message: "Signin required" });
    }

    // Connect to the database
    await db.connect();

    // Find order by ID
    const order = await Order.findById(req.query.id);

    // Disconnect from the database
    await db.disconnect();

    // Send the order data in the response
    res.status(200).json(order);
  } catch (error) {
    // Handle errors
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getOrderByIdHandler;
