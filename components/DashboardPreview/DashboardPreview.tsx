import React from "react";
import Card from "../Card/Card";

const DashboardPreview = () => {
  return (
    <div id="dashboard-preview" className="px-4 sm:px-8 lg:px-16 py-12">
      <h1 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold mb-8">
        Your Dashboard Preview
      </h1>
      <div className="dash-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default DashboardPreview;
