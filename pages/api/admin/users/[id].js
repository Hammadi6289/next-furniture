const { default: User } = require("@/models/User");
const { default: db } = require("@/utils/db");
const { getSession } = require("next-auth/react");

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send("Admin signin required");
  }
  if (req.method === "GET") {
    return getHandler(req, res);
  }
  if (req.method === "DELETE") {
    return deleteHandler(req, res);
  } else if (req.method === "PUT") {
    return putHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "METHOD NOT ALLOWED" });
  }
};
const getHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
};
const putHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    await db.disconnect();
    res.send({ message: "User updated successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User not found" });
  }
};

const postHandler = async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: "user name",
    email: "email",
    password: "123456",
  });

  const user = await newUser.save();
  await db.disconnect();
  res.send({ message: "User created successfully", user });
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.email === "hammad6289@gmail.com") {
      return res.status(400).send({ message: "Can not delete admin" });
    }
    await user.deleteOne();
    await db.disconnect();
    res.send({ message: "User Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "User Not Found" });
  }
};

export default handler;
