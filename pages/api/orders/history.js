import Order from "@/models/Order"; // Import the Order model
import db from "@/utils/db"; // Import the database utility
import { getSession } from "next-auth/react"; // Import the getSession function from next-auth

/**
 * API handler for fetching orders
 */
const handler = async (req, res) => {
  /**
   * Get the session from the request
   */
  const session = await getSession({ req });

  /**
   * If no session is found, return a 401 error
   */
  if (!session) {
    return res.status(401).json({ error: "Signin required" });
  }

  /**
   * Get the user from the session
   */
  const { user } = session;

  try {
    /**
     * Connect to the database
     */
    await db.connect();

    /**
     * Find orders for the current user
     */
    const orders = await Order.find({ user: user._id }).exec();

    /**
     * Disconnect from the database
     */
    await db.disconnect();

    /**
     * Return the orders as JSON
     */
    res.json(orders);
  } catch (error) {
    /**
     * If an error occurs, return a 500 error response
     */
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler; // Export the handler as the default export
