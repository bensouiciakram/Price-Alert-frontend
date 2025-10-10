"use client";

import React from "react";
import { useProducts } from "@/lib/hooks/useProducts";
import { isLoggedIn } from "@/lib/hooks/useAuth";
import Card from "@/components/Card/Card"; // <-- import your Card component

const ProductsPreview = () => {
  const { data: products, isLoading, isError } = useProducts();
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    return (
      <div className="px-4 sm:px-8 lg:px-16 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Please log in to see your products
        </h1>
        <p className="text-gray-500">
          You need to be logged in to preview and monitor your products.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-4 sm:px-8 lg:px-16 py-12 text-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (isError || !products?.length) {
    return (
      <div className="px-4 sm:px-8 lg:px-16 py-12 text-center">
        <p className="text-gray-500">
          No products found. Add some products to see them here.
        </p>
      </div>
    );
  }

  return (
    <div id="dashboard-preview" className="px-4 sm:px-8 lg:px-16 py-12">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
        Preview Your Products
      </h1>
      <p className="text-center text-sm text-gray-500 max-w-xl mx-auto mb-10">
        See how products you’re monitoring appear in your dashboard. Get updates
        in real-time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            product_id={product.id!}
            meta={product.meta!}
            website={product.website}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPreview;
