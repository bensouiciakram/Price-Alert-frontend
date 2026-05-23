"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProduct } from "@/lib/hooks/useProducts";
import { useAlertById, useUpdateAlert } from "@/lib/hooks/useAlerts";
import { usePriceHistory } from "@/lib/hooks/usePriceHistory";
import PriceHistoryChart from "@/components/ProductChart/ProductChart";
import LastPricesRecords from "@/components/LastPricesRecords/LastPricesRecords";
import { FaArrowLeft, FaEdit, FaSave, FaTimes, FaBell } from "react-icons/fa";

const Page = () => {
  const params = useParams();
  const productId = Number(params?.id);

  const { data: product, isLoading: productLoading } = useProduct(productId);
  const currencySymbol = product?.website?.currency?.currency_symbol ?? "$";
  const firstAlertId: number | undefined =
    Array.isArray(product?.alerts) && product.alerts.length
      ? product.alerts[0]
      : undefined;
  const { data: alert } = useAlertById(firstAlertId);
  const updateAlert = useUpdateAlert();

  const { data: allPriceHistory } = usePriceHistory();
  const productPriceHistory = allPriceHistory?.filter(
    (ph) => ph.product.id === productId
  );
  const sortedHistory = productPriceHistory?.sort(
    (a, b) =>
      new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime()
  );
  const currentPrice = sortedHistory?.[0]?.price;

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (alert?.threshold != null) setInputValue(String(alert.threshold));
  }, [alert]);

  const startEdit = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setErrorMessage(null);
    setIsEditing(false);
    setInputValue(alert?.threshold != null ? String(alert.threshold) : "");
  };

  const saveThreshold = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const num = Number(inputValue);
    if (inputValue === "" || Number.isNaN(num) || num <= 0) {
      setErrorMessage("Please enter a valid positive number.");
      return;
    }

    if (!alert?.id) {
      setErrorMessage("No alert exists for this product. Create an alert first.");
      return;
    }

    updateAlert.mutate(
      { id: alert.id, data: { threshold: String(num) } },
      {
        onSuccess: () => {
          setSuccessMessage("Threshold updated successfully");
          setIsEditing(false);
          setTimeout(() => setSuccessMessage(null), 4000);
        },
        onError: (err: Error) => {
          setErrorMessage(err?.message || "Failed to update threshold. Try again.");
        },
      }
    );
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-base-300 skeleton-shimmer" />
          <div className="h-6 w-48 mx-auto skeleton-shimmer rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <main className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-base-content/50 hover:text-base-content transition-colors duration-300 mb-6 animate-fade-in"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Product Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden animate-fade-in-up">
              {/* Product Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-base-300/50">
                <Image
                  src={product?.meta?.image || "https://via.placeholder.com/400x250"}
                  alt={product?.meta?.title || "product"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 to-transparent" />
              </div>

              <div className="card-body p-6 space-y-5">
                {/* Title */}
                <h2 className="font-serif text-2xl text-base-content leading-tight">
                  {product?.meta?.title || "Product"}
                </h2>

                {/* Store */}
                <div className="flex items-center gap-2 text-sm text-base-content/50">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  {product?.website?.url || "Unknown"}
                </div>

                {/* Current Price */}
                <div className="p-4 rounded-xl bg-base-300/30 border border-white/5">
                  <p className="text-xs text-base-content/40 uppercase tracking-wider mb-1">Current Price</p>
                  <p className="font-mono-price text-4xl font-bold text-success">
                    {currencySymbol} {currentPrice ? Number(currentPrice).toFixed(2) : "—"}
                  </p>
                </div>

                {/* Threshold */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <FaBell className="w-4 h-4 text-primary" />
                    <span>Your Threshold</span>
                  </div>

                  {!isEditing ? (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-base-300/30 border border-white/5">
                      <p className="font-mono-price text-xl font-semibold">
                        {currencySymbol} {alert?.threshold ? Number(alert.threshold).toFixed(2) : "—"}
                      </p>
                      <button
                        onClick={startEdit}
                        className="p-2 rounded-lg hover:bg-white/5 text-base-content/50 hover:text-primary transition-colors duration-300"
                        aria-label="Edit threshold"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 p-4 rounded-xl bg-base-300/30 border border-white/5">
                      <input
                        type="number"
                        step="0.01"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="input input-bordered bg-base-200 border-white/10 w-full font-mono-price text-xl"
                        aria-label="Threshold value"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveThreshold}
                          disabled={updateAlert.status === "pending"}
                          className="flex-1 btn btn-primary btn-sm gap-2"
                        >
                          <FaSave className="w-3 h-3" />
                          {updateAlert.status === "pending" ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn btn-ghost btn-sm gap-2"
                        >
                          <FaTimes className="w-3 h-3" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <p className="text-sm text-error flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-error" />
                      {errorMessage}
                    </p>
                  )}
                  {successMessage && (
                    <p className="text-sm text-success flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      {successMessage}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 text-sm text-base-content/50 pt-2 border-t border-white/5">
                  <span className="w-2 h-2 rounded-full bg-success animate-breathe" />
                  <span>Monitor Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chart + Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price History Chart */}
            <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden animate-fade-in-up stagger-1">
              <div className="card-body p-6">
                <PriceHistoryChart data={sortedHistory} currencySymbol={currencySymbol} />
              </div>
            </div>

            {/* Recent Records */}
            <div className="animate-fade-in-up stagger-2">
              <LastPricesRecords data={sortedHistory?.slice(0, 5)} currencySymbol={currencySymbol} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
