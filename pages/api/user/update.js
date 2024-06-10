import db from "@/utils/db";
import { getSession } from "next-auth/react";
import bcryptjs from "bcryptjs";
import User from "@/models/User";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  console.log("Session:", session); // Add debug log
  if (!session) {
    return res.status(401).send({ message: "Sign-in required" });
  }

  const { user } = session;
  console.log("User:", user); // Add debug log
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 5)
  ) {
    return res.status(422).json({ message: "Validation error" });
  }

  try {
    await db.connect();
    const toUpdateUser = await User.findById(user._id);
    if (!toUpdateUser) {
      await db.disconnect();
      return res.status(404).send({ message: "User not found" });
    }

    toUpdateUser.name = name;
    toUpdateUser.email = email;

    if (password) {
      toUpdateUser.password = bcryptjs.hashSync(password, 10);
    }

    await toUpdateUser.save();
    await db.disconnect();

    res.send({ message: "User updated" });
  } catch (error) {
    await db.disconnect();
    res.status(500).send({ message: "Internal Server Error" });
  }
}

export default handler;
