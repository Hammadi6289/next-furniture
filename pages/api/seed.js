import User from "@/models/User";
import Product from "@/models/Product";
import db from "../../utils/db";
import data from "@/utils/data";

const handler = async (req, res) => {
  await db.connect();

  // Remove all existing users and products
  await User.deleteMany();
  await User.insertMany(data.users);

  const existingSlugs = new Set();
  const productsToInsert = [];

  for (const product of data.products) {
    if (existingSlugs.has(product.slug)) {
      console.log(`Duplicate slug found in data: "${product.slug}"`);
      continue;
    }

    const existingProduct = await Product.findOne({ slug: product.slug });
    if (!existingProduct) {
      productsToInsert.push(product);
      existingSlugs.add(product.slug);
    } else {
      console.log(
        `Product with slug "${product.slug}" already exists and will be updated.`
      );
      await Product.updateOne({ slug: product.slug }, product);
    }
  }

  if (productsToInsert.length > 0) {
    try {
      await Product.insertMany(productsToInsert);
    } catch (error) {
      console.error("Error inserting products:", error);
      return res.status(500).send({ message: "Error seeding products" });
    }
  }

  await db.disconnect();
  res.send({ message: "seeded successfully" });
};

export default handler;
