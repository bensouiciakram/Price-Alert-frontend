import React from "react";

const Page = () => {
  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      {/* Form Section */}
      <section className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Create New Scraper
        </h2>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form className="form-control gap-6">
              {/* Product URL */}
              <div>
                <label className="label">
                  <span className="label-text">Product URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/product/123"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Price XPath */}
              <div>
                <label className="label">
                  <span className="label-text">Price XPath</span>
                </label>
                <input
                  type="text"
                  placeholder="//*[@id='priceblock_ourprice']"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Library Type */}
              <div>
                <label className="label">
                  <span className="label-text">Library Type</span>
                </label>
                <select className="select select-bordered w-full">
                  <option value="scrapy">Scrapy</option>
                  <option value="playwright">Playwright</option>
                </select>
              </div>

              {/* Cleaning Regex */}
              <div>
                <label className="label">
                  <span className="label-text">Cleaning Regex</span>
                </label>
                <input
                  type="text"
                  placeholder="[\d.,]+"
                  className="input input-bordered w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use regex to extract only the price value (example:{" "}
                  <code>[\d.,]+</code>).
                </p>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Save Scraper
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
