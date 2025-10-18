"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddScraper } from "@/lib";
import { useCurrencies } from "@/lib/hooks";

const scraperSchema = z.object({
  website: z.string().url("Enter a valid URL"),
  priceXPath: z.string().min(1, "Price XPath is required"),
  priceRegex: z.string().optional(),
  titleXPath: z.string().min(1, "Title XPath is required"),
  titleRegex: z.string().optional(),
  imageXPath: z.string().min(1, "Image XPath is required"),
  imageRegex: z.string().optional(),
  lib: z.enum(["playwright", "requests"]),
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
      lib: "playwright",
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
        currency: Number(values.currency),
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
      <section className="max-w-3xl mx-auto py-12 sm:py-16 px-6 sm:px-8">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Create New Scraper
        </h2>

        <div className="card bg-base-100 shadow-xl rounded-2xl">
          <div className="card-body p-8 sm:p-10">
            <form
              className="form-control gap-10"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Website */}
              <div className="space-y-3">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-base">
                    Website
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  className={`input input-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300 ${
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

              {/* Price Section */}
              <div className="p-5 bg-base-200/60 rounded-xl space-y-5">
                <h3 className="font-semibold text-lg text-base-content/90">
                  Price Extraction
                </h3>

                <div className="space-y-2">
                  <label className="label pb-1">
                    <span className="label-text text-sm font-medium">
                      Price XPath
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="//*[@id='priceblock_ourprice']"
                    className={`input input-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300 ${
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

                <div className="space-y-2">
                  <label className="label pb-1">
                    <span className="label-text text-sm font-medium">
                      Price Cleanup Regex
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="[\\d.,]+"
                    className="input input-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300"
                    {...register("priceRegex")}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use regex to extract only the price (e.g.{" "}
                    <code>[\d.,]+</code>).
                  </p>
                </div>
              </div>

              {/* Title Section */}
              <div className="p-5 bg-base-200/60 rounded-xl space-y-5">
                <h3 className="font-semibold text-lg text-base-content/90">
                  Title Extraction
                </h3>

                <div className="space-y-2">
                  <label className="label pb-1">
                    <span className="label-text text-sm font-medium">
                      Title XPath
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="//h1[@id='productTitle']"
                    className={`input input-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300 ${
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

                <div className="space-y-2">
                  <label className="label pb-1">
                    <span className="label-text text-sm font-medium">
                      Title Cleanup Regex
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder=".*"
                    className="input input-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300"
                    {...register("titleRegex")}
                  />
                </div>
              </div>

              {/* Image Section */}
              <div className="p-5 bg-base-200/60 rounded-xl space-y-5">
                <h3 className="font-semibold text-lg text-base-content/90">
                  Image Extraction
                </h3>

                <div className="space-y-2">
                  <label className="label pb-1">
                    <span className="label-text text-sm font-medium">
                      Image XPath
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="//img[@id='main-image']/@src"
                    className={`input input-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300 ${
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

                <div className="space-y-2">
                  <label className="label pb-1">
                    <span className="label-text text-sm font-medium">
                      Image Cleanup Regex
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="https?://.*"
                    className="input input-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300"
                    {...register("imageRegex")}
                  />
                </div>
              </div>

              {/* Currency */}
              <div className="space-y-3">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-base">
                    Currency
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300 ${
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
                    <option key={c.id} value={c.id}>
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
              <div className="space-y-3">
                <label className="label pb-1">
                  <span className="label-text font-semibold text-base">
                    Library Type
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full h-11 focus:outline-none focus:ring-0 focus:border-base-300 ${
                    errors.lib ? "select-error" : ""
                  }`}
                  {...register("lib")}
                >
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
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto px-8 py-3 text-base"
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
