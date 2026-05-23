/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { ProductMetaData, Website } from "@/lib";
import { useLastPrice } from "@/lib";
import { FaExternalLinkAlt } from "react-icons/fa";

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
      className="group block"
    >
      <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden card-lift card-glow h-full">
        {/* Image Area */}
        <div className="relative h-48 overflow-hidden bg-base-300/50">
          {meta?.image ? (
            <img
              src={meta.image}
              alt={meta.title || "Product"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            /> 
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-base-content/20 text-sm">No Image</span>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="card-body p-5 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
            {meta?.title || "Untitled Product"}
          </h3>

          {/* Website */}
          <div className="flex items-center gap-2 text-xs text-base-content/40">
            <FaExternalLinkAlt className="w-3 h-3" />
            <span className="truncate">{website?.url || "Unknown"}</span>
          </div>

          {/* Price */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-xs text-base-content/40 mb-1">Current Price</p>
            <p className="font-mono-price text-2xl font-bold text-success">
              {website?.currency?.currency_symbol ?? ""}
              {price ? Number(price).toFixed(2) : "—"}
            </p>
          </div>

          {/* Last Updated */}
          {checked_at && (
            <p className="text-xs text-base-content/30">
              Updated {checked_at}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
