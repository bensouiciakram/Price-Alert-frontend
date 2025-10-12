"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddScraper } from "@/lib";
import { useCurrencies } from "@/lib/hooks";

// ✅ Updated schema to include currency
const scraperSchema = z.object({
  website: z.string().url("Enter a valid URL"),
  priceXPath: z.string().min(1, "Price XPath is required"),
  priceRegex: z.string().optional(),
  titleXPath: z.string().min(1, "Title XPath is required"),
  titleRegex: z.string().optional(),
  imageXPath: z.string().min(1, "Image XPath is required"),
  imageRegex: z.string().optional(),
  lib: z.enum(["scrapy", "playwright", "requests"]),
  currency: z.string().min(1, "Currency is required"),
});

type ScraperFormValues = z.infer<typeof scraperSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScraperFormValues>({
    resolver: zodResolver(scraperSchema),
    defaultValues: {
      website: "",
      priceXPath: "",
      priceRegex: "",
      titleXPath: "",
      titleRegex: "",
      imageXPath: "",
      imageRegex: "",
      lib: "scrapy",
      currency: "",
    },
  });

  const addScraper = useAddScraper();
  const { data: currencies, isLoading: currenciesLoading } = useCurrencies();

  const onSubmit = async (values: ScraperFormValues) => {
    try {
      const scraperData = {
        url: values.website,
        scraping_method: values.lib,
        price_selector: values.priceXPath,
        image_selector: values.imageXPath,
        title_selector: values.titleXPath,
        price_cleanup: values.priceRegex || "",
        title_cleanup: values.titleRegex || "",
        image_cleanup: values.imageRegex || "",
        currency: values.currency,
      };

      const result = await addScraper.mutateAsync(scraperData);

      console.log("Scraper added successfully:", result.message);
      reset();
      alert("Scraper added successfully!");
    } catch (error) {
      console.error("Failed to add scraper:", error);
      alert("Failed to add scraper. Please try again.");
    }
  };

  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      <section className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Create New Scraper
        </h2>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form
              className="form-control gap-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Website */}
              <div>
                <label className="label">
                  <span className="label-text">Website</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  className={`input input-bordered w-full ${
                    errors.website ? "input-error" : ""
                  }`}
                  {...register("website")}
                />
                {errors.website && (
                  <span className="text-error text-xs mt-1">
                    {errors.website.message}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="grid gap-4">
                <h3 className="font-semibold">Price Extraction</h3>
                <div>
                  <label className="label">
                    <span className="label-text">Price XPath</span>
                  </label>
                  <input
                    type="text"
                    placeholder="//*[@id='priceblock_ourprice']"
                    className={`input input-bordered w-full ${
                      errors.priceXPath ? "input-error" : ""
                    }`}
                    {...register("priceXPath")}
                  />
                  {errors.priceXPath && (
                    <span className="text-error text-xs mt-1">
                      {errors.priceXPath.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Price Cleanup Regex</span>
                  </label>
                  <input
                    type="text"
                    placeholder="[\\d.,]+"
                    className="input input-bordered w-full"
                    {...register("priceRegex")}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use regex to extract only the price (example:{" "}
                    <code>[\d.,]+</code>).
                  </p>
                </div>
              </div>

              {/* Title */}
              <div className="grid gap-4">
                <h3 className="font-semibold">Title Extraction</h3>
                <div>
                  <label className="label">
                    <span className="label-text">Title XPath</span>
                  </label>
                  <input
                    type="text"
                    placeholder="//h1[@id='productTitle']"
                    className={`input input-bordered w-full ${
                      errors.titleXPath ? "input-error" : ""
                    }`}
                    {...register("titleXPath")}
                  />
                  {errors.titleXPath && (
                    <span className="text-error text-xs mt-1">
                      {errors.titleXPath.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Title Cleanup Regex</span>
                  </label>
                  <input
                    type="text"
                    placeholder=".*"
                    className="input input-bordered w-full"
                    {...register("titleRegex")}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="grid gap-4">
                <h3 className="font-semibold">Image Extraction</h3>
                <div>
                  <label className="label">
                    <span className="label-text">Image XPath</span>
                  </label>
                  <input
                    type="text"
                    placeholder="//img[@id='main-image']/@src"
                    className={`input input-bordered w-full ${
                      errors.imageXPath ? "input-error" : ""
                    }`}
                    {...register("imageXPath")}
                  />
                  {errors.imageXPath && (
                    <span className="text-error text-xs mt-1">
                      {errors.imageXPath.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Image Cleanup Regex</span>
                  </label>
                  <input
                    type="text"
                    placeholder="https?://.*"
                    className="input input-bordered w-full"
                    {...register("imageRegex")}
                  />
                </div>
              </div>

              {/* ✅ Currency Selector (moved before library) */}
              <div>
                <label className="label">
                  <span className="label-text">Currency</span>
                </label>
                <select
                  className={`select select-bordered w-full ${
                    errors.currency ? "select-error" : ""
                  }`}
                  {...register("currency")}
                  disabled={currenciesLoading}
                >
                  <option value="">
                    {currenciesLoading
                      ? "Loading currencies..."
                      : "Select a currency"}
                  </option>
                  {currencies?.map((c) => (
                    <option key={c.id} value={c.currency_name}>
                      {c.currency_name} ({c.currency_symbol})
                    </option>
                  ))}
                </select>
                {errors.currency && (
                  <span className="text-error text-xs mt-1">
                    {errors.currency.message}
                  </span>
                )}
              </div>

              {/* Library */}
              <div>
                <label className="label">
                  <span className="label-text">Library Type</span>
                </label>
                <select
                  className={`select select-bordered w-full ${
                    errors.lib ? "select-error" : ""
                  }`}
                  {...register("lib")}
                >
                  <option value="scrapy">Scrapy</option>
                  <option value="playwright">Playwright</option>
                  <option value="requests">Requests</option>
                </select>
                {errors.lib && (
                  <span className="text-error text-xs mt-1">
                    {errors.lib.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto"
                  disabled={addScraper.isPending}
                >
                  {addScraper.isPending ? "Saving..." : "Save Scraper"}
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
