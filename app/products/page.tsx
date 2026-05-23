"use client";
import React from "react";
import Link from "next/link";
import { useProducts } from "@/lib/hooks/useProducts";
import Card from "@/components/Card/Card";
import { FaPlus, FaSearch } from "react-icons/fa";

const Page = () => {
  const { data: products, isLoading: productsLoading } = useProducts();

  return (
    <div className="min-h-screen bg-base-200">
      <section className="max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 animate-fade-in-up">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-base-content mb-2">
              Your Products
            </h2>
            <p className="text-base-content/50">
              {products?.length ?? 0} products being monitored
            </p>
          </div>
          <Link
            href="/products/add-product"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content font-semibold rounded-xl hover:brightness-110 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            <FaPlus className="w-4 h-4" />
            Add Product
          </Link>
        </div>

        {/* Loading State */}
        {productsLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="card-body space-y-4">
                  <div className="h-6 w-3/4 skeleton-shimmer rounded" />
                  <div className="h-4 w-1/2 skeleton-shimmer rounded" />
                  <div className="h-8 w-1/3 skeleton-shimmer rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!productsLoading && (!products || products.length === 0) && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-base-300 flex items-center justify-center">
              <FaSearch className="w-10 h-10 text-base-content/20" />
            </div>
            <h3 className="font-serif text-2xl text-base-content mb-3">
              No Products Yet
            </h3>
            <p className="text-base-content/50 max-w-md mx-auto mb-8">
              Start tracking prices by adding your first product from any supported store.
            </p>
            <Link
              href="/products/add-product"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-content font-semibold rounded-xl hover:brightness-110 transition-all duration-300"
            >
              <FaPlus className="w-4 h-4" />
              Add Your First Product
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!productsLoading && products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <Card
                  product_id={product.id!}
                  meta={product.meta!}
                  website={product.website}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Page;
