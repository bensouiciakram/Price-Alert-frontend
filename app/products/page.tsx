"use client";
import React from "react";
import Link from "next/link";
import { useProducts } from "@/lib/hooks/useProducts";
import Card from "@/components/Card/Card";
import { FaPlus } from "react-icons/fa";
import EmptyState from "@/components/EmptyState/EmptyState";
import { SkeletonGrid } from "@/components/SkeletonCard/SkeletonCard";

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
        {productsLoading && <SkeletonGrid count={6} columns={3} />}

        {/* Empty State */}
        {!productsLoading && (!products || products.length === 0) && (
          <EmptyState
            icon={FaPlus}
            title="No Products Yet"
            description="Start tracking prices by adding your first product from any supported store."
            actionLabel="Add Your First Product"
            actionHref="/products/add-product"
          />
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