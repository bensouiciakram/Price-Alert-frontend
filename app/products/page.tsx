"use client";
import React from "react";
import Link from "next/link";
import { useProducts } from "@/lib/hooks/useProducts";
import Card from "@/components/Card/Card";
import { useLastPrice } from "@/lib/hooks/usePriceHistory";

const Page = () => {
  const { data: products, isLoading: productsLoading } = useProducts();

  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      <section className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">Your Products</h2>
          <Link
            href="/products/add-product"
            className="btn btn-primary btn-sm sm:btn-md"
          >
            + Add Product
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsLoading ? (
            <div>Loading products...</div>
          ) : (
            products?.map((product) => (
              <Card
                key={product.id}
                product_id={product.id!!}
                meta={product.meta!}
                website={product.website}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
