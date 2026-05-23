"use client";

import React from "react";
import { useProducts } from "@/lib/hooks/useProducts";
import { isLoggedIn } from "@/lib/hooks/useAuth";
import Card from "@/components/Card/Card";
import { FaShoppingBag } from "react-icons/fa";

const ProductsPreview = () => {
  const { data: products, isLoading, isError } = useProducts();
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    return (
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-30" />
        <div className="relative z-10 max-w-xl mx-auto text-center animate-fade-in-up">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <FaShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-base-content mb-4">
            Your Products Await
          </h2>
          <p className="text-base-content/60 text-lg leading-relaxed">
            Log in to see your monitored products and receive real-time price drop alerts.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden">
                <div className="card-body space-y-4">
                  <div className="h-6 w-3/4 skeleton-shimmer rounded" />
                  <div className="h-4 w-1/2 skeleton-shimmer rounded" />
                  <div className="h-8 w-1/3 skeleton-shimmer rounded" />
                  <div className="h-4 w-2/3 skeleton-shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !products?.length) {
    return (
      <section className="py-20 sm:py-28 px-4 sm:px-8 lg:px-16">
        <div className="max-w-xl mx-auto text-center animate-fade-in-up">
          <h2 className="font-serif text-2xl sm:text-3xl text-base-content mb-3">
            No Products Yet
          </h2>
          <p className="text-base-content/60">
            Start monitoring by adding your first product. We will track prices and alert you on drops.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard-preview" className="relative py-20 sm:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-base-content mb-4">
            Your Monitored Products
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            Real-time price tracking across all your favorite stores.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <Card
                product_id={product.id!}
                meta={product.meta!}
                website={product.website}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;
