"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const scraperSchema = z.object({
  url: z.string().url("Enter a valid URL"),
  priceXPath: z.string().min(1, "Price XPath is required"),
  priceRegex: z.string().optional(),
  titleXPath: z.string().min(1, "Title XPath is required"),
  titleRegex: z.string().optional(),
  imageXPath: z.string().min(1, "Image XPath is required"),
  imageRegex: z.string().optional(),
  lib: z.enum(["scrapy", "playwright"]),
});

type ScraperFormValues = z.infer<typeof scraperSchema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ScraperFormValues>({
    resolver: zodResolver(scraperSchema),
    defaultValues: {
      url: "",
      priceXPath: "",
      priceRegex: "",
      titleXPath: "",
      titleRegex: "",
      imageXPath: "",
      imageRegex: "",
      lib: "scrapy",
    },
  });

  const onSubmit = async (values: ScraperFormValues) => {
    console.log("save scraper", values);
    reset({
      url: "",
      priceXPath: "",
      priceRegex: "",
      titleXPath: "",
      titleRegex: "",
      imageXPath: "",
      imageRegex: "",
      lib: "scrapy",
    });
  };
  return (
    <div className="bg-base-200 text-base-content min-h-screen">
      {/* Form Section */}
      <section className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Create New Scraper
        </h2>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form className="form-control gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Product URL */}
              <div>
                <label className="label">
                  <span className="label-text">Product URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/product/123"
                  className={`input input-bordered w-full ${errors.url ? "input-error" : ""}`}
                  aria-invalid={!!errors.url}
                  {...register("url")}
                />
                {errors.url && (
                  <span className="text-error text-xs mt-1">{errors.url.message}</span>
                )}
              </div>

              {/* Field Group: Price */}
              <div className="grid gap-4">
                <h3 className="font-semibold">Price Extraction</h3>

                {/* Price XPath */}
                <div>
                  <label className="label">
                    <span className="label-text">Price XPath</span>
                  </label>
                  <input
                    type="text"
                    placeholder="//*[@id='priceblock_ourprice']"
                    className={`input input-bordered w-full ${errors.priceXPath ? "input-error" : ""}`}
                    aria-invalid={!!errors.priceXPath}
                    {...register("priceXPath")}
                  />
                  {errors.priceXPath && (
                    <span className="text-error text-xs mt-1">{errors.priceXPath.message}</span>
                  )}
                </div>

                {/* Price Regex */}
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
                    Use regex to extract only the price (example: {" "}
                    <code>[\d.,]+</code>).
                  </p>
                </div>
              </div>

              {/* Field Group: Title */}
              <div className="grid gap-4">
                <h3 className="font-semibold">Title Extraction</h3>

                {/* Title XPath */}
                <div>
                  <label className="label">
                    <span className="label-text">Title XPath</span>
                  </label>
                  <input
                    type="text"
                    placeholder="//h1[@id='productTitle']"
                    className={`input input-bordered w-full ${errors.titleXPath ? "input-error" : ""}`}
                    aria-invalid={!!errors.titleXPath}
                    {...register("titleXPath")}
                  />
                  {errors.titleXPath && (
                    <span className="text-error text-xs mt-1">{errors.titleXPath.message}</span>
                  )}
                </div>

                {/* Title Regex */}
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
                  <p className="text-xs text-gray-500 mt-1">
                    Use regex to refine the title (leave <code>.*</code> for raw
                    text).
                  </p>
                </div>
              </div>

              {/* Field Group: Image */}
              <div className="grid gap-4">
                <h3 className="font-semibold">Image Extraction</h3>

                {/* Image XPath */}
                <div>
                  <label className="label">
                    <span className="label-text">Image XPath</span>
                  </label>
                  <input
                    type="text"
                    placeholder="//img[@id='main-image']/@src"
                    className={`input input-bordered w-full ${errors.imageXPath ? "input-error" : ""}`}
                    aria-invalid={!!errors.imageXPath}
                    {...register("imageXPath")}
                  />
                  {errors.imageXPath && (
                    <span className="text-error text-xs mt-1">{errors.imageXPath.message}</span>
                  )}
                </div>

                {/* Image Regex */}
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
                  <p className="text-xs text-gray-500 mt-1">
                    Use regex to validate/clean the image URL (example: {" "}
                    <code>https?://.*</code>).
                  </p>
                </div>
              </div>

              {/* Library Type */}
              <div>
                <label className="label">
                  <span className="label-text">Library Type</span>
                </label>
                <select
                  className={`select select-bordered w-full ${errors.lib ? "select-error" : ""}`}
                  aria-invalid={!!errors.lib}
                  {...register("lib")}
                >
                  <option value="scrapy">Scrapy</option>
                  <option value="playwright">Playwright</option>
                </select>
                {errors.lib && (
                  <span className="text-error text-xs mt-1">{errors.lib.message}</span>
                )}
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Scraper"}
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
