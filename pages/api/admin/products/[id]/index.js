import Product from "@/models/Product";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session || !session.user.isAdmin) {
      return res
        .status(401)
        .json({ message: "Sign In required or insufficient permissions" });
    }

    switch (req.method) {
      case "GET":
        await getHandler(req, res);
        break;
      case "PUT":
        await putHandler(req, res);
        break;
      default:
        res.status(405).json({ message: "Method not allowed" });
        break;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getHandler = async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);

    if (!product) {
      await db.disconnect();
      return res.status(404).json({ message: "catalogue not found" });
    }

    await db.disconnect();
    res.status(200).json(product);
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: "Failed to retrieve catalogue" });
  }
};

const putHandler = async (req, res) => {
  try {
    await db.connect();
    const product = await Product.findById(req.query.id);

    if (!product) {
      await db.disconnect();
      return res.status(404).json({ message: "catalogue not found" });
    }

    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.category = req.body.category;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

    await product.save();
    await db.disconnect();

    res.status(200).json({ message: "catalogue updated successfully" });
  } catch (error) {
    await db.disconnect();
    res.status(500).json({ message: "Failed to update catalogue" });
  }
};

export default handler;
