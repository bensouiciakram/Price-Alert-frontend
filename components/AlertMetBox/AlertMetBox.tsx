"use client";
import React from "react";
import Link from "next/link";
import { FaArrowTrendDown, FaArrowUpRightFromSquare } from "react-icons/fa6";

interface AlertBoxProps {
  productId: number;
  productTitle: string;
  websiteUrl: string;
  triggeredAt: string;
  threshold: number;
  newPrice: number;
  currencySymbol: string;
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
  const savings = threshold - newPrice;
  const savingsPercent = ((savings / threshold) * 100).toFixed(1);

  return (
    <Link href={`/products/${productId}`} className="group block">
      <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden card-lift card-glow animate-pulse-glow h-full">
        <div className="card-body p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <FaArrowTrendDown className="w-4 h-4 text-success" />
              </div>
              <span className="text-xs font-semibold text-success uppercase tracking-wider">
                Price Dropped
              </span>
            </div>
            <span className="text-xs text-base-content/30 flex-shrink-0">{triggeredAt}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-snug">
            {productTitle}
          </h3>

          {/* Website */}
          <div className="flex items-center gap-2 text-xs text-base-content/40">
            <FaArrowUpRightFromSquare className="w-3 h-3" />
            <span className="truncate">{websiteUrl}</span>
          </div>

          {/* Prices */}
          <div className="pt-3 border-t border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-base-content/40">Threshold</span>
              <span className="font-mono-price text-sm text-base-content/60 line-through">
                {currencySymbol}{threshold.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-base-content/40">New Price</span>
              <span className="font-mono-price text-lg font-bold text-success">
                {currencySymbol}{newPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-xs text-success/70">You Save</span>
              <span className="text-sm font-semibold text-success">
                {currencySymbol}{savings.toFixed(2)} ({savingsPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlertBox;
