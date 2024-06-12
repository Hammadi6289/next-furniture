import Product from "@/models/Product";
import db from "@/utils/db";
const { getSession } = require("next-auth/react");

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send({ message: `admin signIn required` });
  }
  if (req.method === "GET") {
    return getHandler(req, res);
  } else if (req.method === "POST") {
    return postHandler(req, res);
  } else {
    return res.status(400).send({ message: "Method not allowed" });
  }
};
const postHandler = async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: "Catalogue name",
    slug: "Cata-" + Math.random(),
    image: "/images/SOFA DRAWING1.jpg",
    price: 0,
    category: "sample category",
    brand: "Mr. Furniture",
    countInStock: 0,
    description: "sample description",
    rating: 0,
    numReviews: 0,
  });
  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "Item created successfully", product });
};

const getHandler = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
};
export default handler;
