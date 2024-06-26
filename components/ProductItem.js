/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { Fade } from "react-reveal";

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div>
      <Fade right>
        <div className="card">
          <Link href={`/product/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="rounded shadow"
            />
          </Link>
          <div className="flex flex-col items-center justify-center">
            <Link href={`/product/${product.slug}`}>
              <h2 className="text-lg"> {product.name}</h2>
            </Link>
            <p className="mb-2">{product.brand}</p>
            <p>Rs. {product.price}</p>
            <button
              className="primary-button"
              type="button"
              onClick={() => addToCartHandler(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Fade>
    </div>
  );
}
