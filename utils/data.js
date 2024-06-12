import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Hammad",
      email: "hammad6289@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Hammad",
      email: "hammadxstech@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
    {
      name: "Tariq",
      email: "Tariq6289@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: "Center Table",
      slug: "center-table",
      category: "Tables",
      image: "/images/CENTER TABLE SMALL.jpg",
      price: 17000,
      brand: "Mr. Furniture",
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: "A popular center table design",
      isFeatured: false, // Ensure consistency by adding this property
      banner: null, // Ensure consistency by adding this property
    },
    {
      name: "Center Table",
      slug: "center-table",
      category: "Tables",
      image: "/images/CENTER TABLE.jpg",
      price: 12000,
      brand: "Mr. Furniture",
      rating: 3.2,
      numReviews: 10,
      countInStock: 20,
      description: "Simple vintage table",
      isFeatured: false, // Ensure consistency by adding this property
      banner: null, // Ensure consistency by adding this property
    },
    {
      name: "Wooden Chair",
      slug: "wooden-chair",
      category: "Chairs",
      image: "/images/CHAIR.jpg",
      price: 25000,
      brand: "Mr. Furniture",
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: "Soft foamic comfortable wooden chair",
      isFeatured: true,
      banner: "/images/banner1.png",
    },
    {
      name: "Wooden Chair",
      slug: "wooden-chair",
      category: "Chairs",
      image: "/images/CHAIR1.jpg",
      price: 28000,
      brand: "Mr. Furniture",
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: "Soft foamic comfortable wooden chair",
      isFeatured: false, // Ensure consistency by adding this property
      banner: null, // Ensure consistency by adding this property
    },
    {
      name: "Dining Table",
      slug: "dining-table",
      category: "Tables",
      image: "/images/DINIG TABLE.jpg",
      price: 98000,
      brand: "Mr. Furniture",
      rating: 4.8,
      numReviews: 13,
      countInStock: 20,
      description: "One is the thousand Dining Table",
      isFeatured: false, // Ensure consistency by adding this property
      banner: null, // Ensure consistency by adding this property
    },
    {
      name: "Single Bed",
      slug: "single-bed",
      category: "Beds",
      image: "/images/SINGLE BED.jpg",
      price: 75000,
      brand: "Mr. Furniture",
      rating: 3.9,
      numReviews: 7,
      countInStock: 1,
      description: "Beautiful Handmade single bed without cusioning",
      isFeatured: false, // Ensure consistency by adding this property
      banner: null, // Ensure consistency by adding this property
    },
    {
      name: "TV Lounge Sofa",
      slug: "tv-lounge-sofa",
      category: "Sofas",
      image: "/images/SOFA TV LOUNGE.jpg",
      price: 150000,
      brand: "Mr. Furniture",
      rating: 4.4,
      numReviews: 14,
      countInStock: 2,
      description: "Sofa for the whole family",
      isFeatured: false, // Ensure consistency by adding this property
      banner: null, // Ensure consistency by adding this property
    },
  ],
};

export default data;
