'use client';
import React from "react";
import Link from "next/link";
import { useProducts } from "@/lib/hooks/useProducts";
import { usePriceHistory } from "@/lib/hooks/usePriceHistory";

const page = () => {
  const { data: products, isLoading } = useProducts();
  const { data: priceHistory } = usePriceHistory();

  // Helper to get latest price for a product
  const getLatestPrice = (productId?: number) => {
    if (!priceHistory || !productId) return { price: "—", checked_at: "—" };
    const history = priceHistory
      .filter((ph) => ph.product.id === productId)
      .sort((a, b) => new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime());
    if (history.length === 0) return { price: "—", checked_at: "—" };
    return { price: history[0].price, checked_at: history[0].checked_at };
  };

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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            products?.map((product) => {
              const { price, checked_at } = getLatestPrice(product.id);
              return (
                <Link href={`/products/${product.id}`} key={product.id} className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-lg">
                      {product.meta?.title || "Untitled"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.website?.url || "Unknown"}
                    </p>
                    <p className="text-2xl font-bold text-success mt-2">
                      ${price}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Last updated: {checked_at}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
