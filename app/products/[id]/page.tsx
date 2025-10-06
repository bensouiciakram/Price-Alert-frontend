"use client";

import React, { useEffect, useState } from "react";
import PriceHistoryChart from "@/components/ProductChart/ProductChart";
import { useParams } from "next/navigation";
import { useProduct } from "@/lib/hooks/useProducts";
import { useAlertById, useUpdateAlert } from "@/lib/hooks/useAlerts";
import { usePriceHistory } from "@/lib/hooks/usePriceHistory";

const Page = () => {
  const params = useParams();
  const productId = Number(params?.id);

  // Product
  const { data: product, isLoading: productLoading } = useProduct(productId);
  console.log("product", product);
  const productAny = product as any;
  const firstAlertId: number | undefined =
    Array.isArray(productAny?.alerts) && productAny.alerts.length
      ? productAny.alerts[0]
      : undefined;
  const { data: alert, isLoading: alertLoading } = useAlertById(firstAlertId);
  const updateAlert = useUpdateAlert();

  // Price History
  const { data: allPriceHistory } = usePriceHistory();
  const productPriceHistory = allPriceHistory?.filter(
    (ph) => ph.product.id === productId
  );
  const sortedHistory = productPriceHistory?.sort(
    (a, b) => new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime()
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

  // format currency helper
  const formatCurrency = (value?: string | number) => {
    if (value == null || value === "") return "—";
    const num = Number(value);
    if (Number.isNaN(num)) return value as any;
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

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
        onError: (err: any) => {
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
            <figure>
              <img
                src={
                  productAny?.meta?.image ||
                  "https://via.placeholder.com/400x250"
                }
                alt={productAny?.meta?.title || "product"}
                className="object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {productAny?.meta?.title || "Product"}
              </h2>
              <p className="text-sm text-gray-500">
                Store: {productAny?.website?.url || "Unknown"}
              </p>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Current Price</p>
                  <p className="text-3xl font-bold text-success">
                    {formatCurrency(currentPrice ?? 499)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Your Threshold</p>
                  {!isEditing ? (
                    <>
                      <p className="text-lg font-semibold">
                        {formatCurrency(alert?.threshold)}
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
                  <button className="btn btn-error">Delete Monitor</button>
                  <a href="/dashboard" className="btn btn-outline btn-sm">
                    Back to Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chart + Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price History */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <PriceHistoryChart />
                <p className="text-xs text-gray-400 mt-3">
                  (Integrate chart library like Recharts / Chart.js when
                  converting to React)
                </p>
              </div>
            </div>

            {/* Recent Records */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-lg">Recent Price Records</h3>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full text-sm">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-09-30 14:25</td>
                        <td>$499.00</td>
                        <td className="text-success">—</td>
                      </tr>
                      <tr>
                        <td>2025-09-29 09:10</td>
                        <td>$519.00</td>
                        <td className="text-error">- $20</td>
                      </tr>
                      <tr>
                        <td>2025-09-28 08:12</td>
                        <td>$529.00</td>
                        <td className="text-error">- $10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
