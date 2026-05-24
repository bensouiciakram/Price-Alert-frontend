"use client";

import React from "react";
import { useAlertsMet, useWebsites } from "@/lib";
import AlertBox from "@/components/AlertMetBox/AlertMetBox";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import EmptyState from "@/components/EmptyState/EmptyState";

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
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-base-content/50 text-sm">Loading alerts...</p>
        </div>
      </div>
    );
  }

  if (alertsError || websitesError) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <EmptyState
          icon={FaBell}
          title="Failed to Load"
          description="Could not load your alerts. Please try again."
        />
      </div>
    );
  }

  if (!alertMets || alertMets.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <EmptyState
          icon={FaCheckCircle}
          title="All Clear!"
          description="No price drop alerts yet. We will notify you as soon as a product hits your target price."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FaBell className="w-5 h-5 text-primary" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-base-content">
              Price Drop Alerts
            </h1>
          </div>
          <p className="text-base-content/50 ml-13">
            {alertMets.length} alert{alertMets.length !== 1 ? "s" : ""} triggered
          </p>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {alertMets.map((alert, index) => {
            const website = websites?.find((w) => w.url === alert.website_url);
            const currencySymbol = website?.currency?.currency_symbol ?? "";

            return (
              <div
                key={alert.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
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
    </div>
  );
}