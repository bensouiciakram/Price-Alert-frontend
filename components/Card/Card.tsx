import React from "react";
import Link from "next/link";
import { ProductMetaData, Website } from "@/lib";
import { useLastPrice } from "@/lib";

interface Props {
  product_id: number;
  meta: ProductMetaData;
  website: Website;
}

const Card = ({ product_id, meta, website }: Props) => {
  const { data } = useLastPrice(product_id);
  const price = data?.last_price;
  const checked_at = data?.checked_at;
  return (
    <Link
      href={`/products/${product_id}`}
      key={product_id}
      className="card bg-base-100 shadow-md"
    >
      <div className="card-body">
        <h3 className="card-title text-lg">{meta?.title || "Untitled"}</h3>
        <p className="text-sm text-gray-500">{website?.url || "Unknown"}</p>
        <p className="text-2xl font-bold text-success mt-2">${price}</p>
        <p className="text-xs sm:text-sm text-gray-400">
          Last updated: {checked_at}
        </p>
      </div>
    </Link>
  );
};

export default Card;
