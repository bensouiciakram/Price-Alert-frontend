"use client";

import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProduct } from "@/lib/hooks/useProducts";
import { useAlertById, useUpdateAlert } from "@/lib/hooks/useAlerts";
import { usePriceHistory } from "@/lib/hooks/usePriceHistory";
import PriceHistoryChart from "@/components/ProductChart/ProductChart";
import LastPricesRecords from "@/components/LastPricesRecords/LastPricesRecords";

const Page = () => {
  const params = useParams();
  const productId = Number(params?.id);

  // Product
  const { data: product, isLoading: productLoading } = useProduct(productId);
  const currencySymbol = product?.website.currency.currency_symbol;
  const firstAlertId: number | undefined =
    Array.isArray(product?.alerts) && product.alerts.length
      ? product.alerts[0]
      : undefined;
  const { data: alert, isLoading: alertLoading } = useAlertById(firstAlertId);
  const updateAlert = useUpdateAlert();

  // Price History
  const { data: allPriceHistory } = usePriceHistory();
  const productPriceHistory = allPriceHistory?.filter(
    (ph) => ph.product.id === productId
  );
  const sortedHistory = productPriceHistory?.sort(
    (a, b) =>
      new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime()
  );
  const currentPrice = sortedHistory?.[0]?.price;

  // local editing state
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
    // focus handled by browser; could add ref if needed
  };

  const cancelEdit = () => {
    setErrorMessage(null);
    setIsEditing(false);
    // reset to original
    setInputValue(alert?.threshold != null ? String(alert.threshold) : "");
  };

  const saveThreshold = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // basic validation
    const num = Number(inputValue);
    if (inputValue === "" || Number.isNaN(num) || num <= 0) {
      setErrorMessage("Please enter a valid positive number.");
      return;
    }

    if (!alert?.id) {
      setErrorMessage(
        "No alert exists for this product. Create an alert first."
      );
      return;
    }

    updateAlert.mutate(
      { id: alert.id, data: { threshold: String(num) } },
      {
        onSuccess: () => {
          setSuccessMessage("Threshold updated");
          setIsEditing(false);
          // keep message short-lived
          setTimeout(() => setSuccessMessage(null), 4000);
        },
        onError: (err: Error) => {
          setErrorMessage(
            err?.message || "Failed to update threshold. Try again."
          );
        },
      }
    );
  };

  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Product Info */}
          <div className="card bg-base-100 shadow-xl">
            <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-t-xl overflow-hidden bg-base-200 flex items-center justify-center">
              <Image
                src={
                  product?.meta?.image || "https://via.placeholder.com/400x250"
                }
                alt={product?.meta?.title || "product"}
                fill
                className="object-contain p-2"
                sizes="(max-width: 640px) 100vw, 400px"
                priority
              />
            </div>
            <div className="card-body">
              <h2 className="card-title">
                {product?.meta?.title || "Product"}
              </h2>
              <p className="text-sm text-gray-500">
                Store: {product?.website?.url || "Unknown"}
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="text-3xl font-bold text-success">
                    {currencySymbol} {currentPrice}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Your Threshold</p>
                  {!isEditing ? (
                    <>
                      <p className="text-lg font-semibold">
                        {currencySymbol} {alert?.threshold}
                      </p>
                      <button
                        className="btn btn-sm btn-outline mt-2"
                        onClick={startEdit}
                        aria-label="Edit threshold"
                      >
                        Edit Threshold
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                      <input
                        type="number"
                        step="0.01"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="input input-bordered input-sm w-full max-w-xs"
                        aria-label="Threshold value"
                      />
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          className={`btn btn-sm btn-primary ${
                            updateAlert.status === "pending" ? "loading" : ""
                          }`}
                          onClick={saveThreshold}
                          disabled={updateAlert.status === "pending"}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <p className="text-sm text-error mt-2">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-sm text-success mt-2">
                      {successMessage}
                    </p>
                  )}
                </div>

                <div className="text-sm text-gray-400">
                  <p>Last checked: 5 minutes ago</p>
                  <p>
                    Monitor status:{" "}
                    <span className="font-medium text-success">Active</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <Link href="/products" className="btn btn-outline btn-sm">
                    Back to Products
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chart + Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price History */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <PriceHistoryChart data={sortedHistory} />
                <p className="text-xs text-gray-400 mt-3">
                  (Integrate chart library like Recharts / Chart.js when
                  converting to React)
                </p>
              </div>
            </div>

            {/* Recent Records */}
            <LastPricesRecords data={sortedHistory?.slice(0, 3)} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto text-center text-sm text-gray-500 py-8">
        © 2025 Price Monitor
      </footer>
    </div>
  );
};

export default Page;
