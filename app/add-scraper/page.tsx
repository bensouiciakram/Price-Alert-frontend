import React from "react";

const page = () => {
  return (
    <div className="bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-xl font-bold text-indigo-600">Price Monitor</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="dashboard.html" className="hover:text-indigo-600">
              Dashboard
            </a>
            <a href="alerts.html" className="hover:text-indigo-600">
              Alerts
            </a>
            <a href="login.html" className="hover:text-indigo-600">
              Logout
            </a>
          </nav>
        </div>
      </header>

      <section className="max-w-3xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Scraper
        </h2>
        <form className="space-y-6 bg-white shadow rounded-xl p-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/product/123"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price XPath
            </label>
            <input
              type="text"
              placeholder="//*[@id='priceblock_ourprice']"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Library Type
            </label>
            <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500">
              <option value="scrapy">Scrapy</option>
              <option value="playwright">Playwright</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cleaning Regex
            </label>
            <input
              type="text"
              placeholder="[\d.,]+"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use regex to extract only the price value (example:{" "}
              <code>[\d.,]+</code>).
            </p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700"
            >
              Save Scraper
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default page;
