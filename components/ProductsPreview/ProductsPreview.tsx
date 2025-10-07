import React from "react";
import Card from "../Card/Card";

const ProductsPreview = () => {
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
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default ProductsPreview;
