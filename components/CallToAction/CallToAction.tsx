import React from "react";

const CallToAction = () => {
  return (
    <div className="hero bg-primary text-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Monitor Product Prices in Real-Time
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl opacity-90">
            Add products from Amazon, eBay, or any store. Get instant alerts
            when prices drop below your target.
          </p>
          <button className="mt-6 btn btn-soft rounded-lg text-primary font-bold bg-white hover:bg-gray-200 px-8">
            Start Monitoring
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
