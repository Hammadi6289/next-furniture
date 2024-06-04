import User from "@/models/User";
import bcryptjs from "bcryptjs";
import db from "@/utils/db";

/**
 * Handles user registration
 *
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
async function handler(req, res) {
  try {
    const { name, email, password } = req.body;

    /**
     * Validate input data
     */
    if (
      !name ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 5
    ) {
      return res.status(422).json({
        message: "Validation error",
        errors: {
          name: "Name is required",
          email: "Email is required",
          password: "Password must be at least 5 characters long",
        },
      });
    }

    /**
     * Check if user already exists
     */
    await db.connect();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({
        message: "User already exists",
      });
    }

    /**
     * Hash password
     */
    const hashedPassword = await bcryptjs.hash(password, 12);

    /**
     * Create new user
     */
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    const user = await newUser.save();

    /**
     * Return success response
     */
    return res.status(201).json({
      message: "User created successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    await db.disconnect();
  }
}

export default handler;
