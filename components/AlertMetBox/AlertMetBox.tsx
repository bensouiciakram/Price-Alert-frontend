"use client";
import React from "react";
import Link from "next/link";

interface AlertBoxProps {
  productId: number;
  productTitle: string;
  websiteUrl: string;
  triggeredAt: string;
  threshold: number;
  newPrice: number;
  currencySymbol: string; // ✅ new prop
}

const AlertBox: React.FC<AlertBoxProps> = ({
  productId,
  productTitle,
  websiteUrl,
  triggeredAt,
  threshold,
  newPrice,
  currencySymbol,
}) => {
  return (
    <Link href={`/products/${productId}`}>
      <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-lg font-semibold">
            {productTitle} — <span className="text-success">Price Dropped</span>
          </h2>

          <p className="text-sm text-gray-500">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-blue-600"
            >
              {websiteUrl}
            </a>{" "}
            • Triggered: {triggeredAt}
          </p>

          <div className="mt-2 space-y-1">
            <p>
              <span className="font-semibold">Threshold:</span> {currencySymbol}
              {threshold}
            </p>
            <p>
              <span className="font-semibold">New Price:</span> {currencySymbol}
              {newPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlertBox;
