"use client";

import React from "react";
import { useAlertsMet, useWebsites } from "@/lib";
import AlertBox from "@/components/AlertMetBox/AlertMetBox";

export default function AlertsPage() {
  const {
    data: alertMets,
    isLoading: alertsLoading,
    isError: alertsError,
  } = useAlertsMet();
  const {
    data: websites,
    isLoading: websitesLoading,
    isError: websitesError,
  } = useWebsites();

  if (alertsLoading || websitesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (alertsError || websitesError) {
    return (
      <div className="text-center text-error mt-10">
        <p>Failed to load alerts or websites.</p>
      </div>
    );
  }

  if (!alertMets || alertMets.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No alerts found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">
        Alerts
      </h1>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6
        "
      >
        {alertMets.map((alert) => {
          const website = websites?.find((w) => w.url === alert.website_url);
          const currencySymbol = website?.currency_symbol || "";

          return (
            <div
              key={alert.id}
              className="flex justify-center sm:justify-start"
            >
              <AlertBox
                productId={alert.product_id}
                productTitle={alert.product_name}
                websiteUrl={alert.website_url}
                triggeredAt={alert.triggered_at}
                threshold={alert.threshold_price}
                newPrice={alert.new_price}
                currencySymbol={currencySymbol}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
