"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddScraper } from "@/lib";
import { useCurrencies } from "@/lib/hooks";
import { FaGlobe, FaCode, FaImage, FaBook, FaWrench, FaSave } from "react-icons/fa";
import { scraperSchema, ScraperFormValues } from "@/lib/schemas";
import { LIBRARY_OPTIONS } from "@/lib/constants";
import SectionHeader from "@/components/SectionHeader/SectionHeader";

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
    <div className="min-h-screen bg-base-200">
      <section className="max-w-2xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <h2 className="font-serif text-3xl sm:text-4xl text-base-content mb-3">
            Create New Scraper
          </h2>
          <p className="text-base-content/50 max-w-md mx-auto">
            Configure selectors to extract product data from any e-commerce website.
          </p>
        </div>

        <div className="card bg-base-100 border border-white/5 rounded-2xl overflow-hidden animate-fade-in-up stagger-1">
          <div className="card-body p-6 sm:p-8">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Website */}
              <div className="space-y-3">
                <SectionHeader icon={FaGlobe} title="Website" />
                <input
                  type="url"
                  placeholder="https://example.com"
                  className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.website ? "border-error/50" : ""
                  }`}
                  {...register("website")}
                />
                {errors.website && (
                  <span className="text-error text-xs">{errors.website.message}</span>
                )}
              </div>

              {/* Price Section */}
              <div className="p-5 rounded-xl bg-base-300/20 border border-white/5 space-y-4">
                <SectionHeader icon={FaCode} title="Price Extraction" />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70">Price XPath</label>
                  <input
                    type="text"
                    placeholder="//*[@id='priceblock_ourprice']"
                    className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                      errors.priceXPath ? "border-error/50" : ""
                    }`}
                    {...register("priceXPath")}
                  />
                  {errors.priceXPath && (
                    <span className="text-error text-xs">{errors.priceXPath.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70">Price Cleanup Regex</label>
                  <input
                    type="text"
                    placeholder="[\\d.,]+"
                    className="input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    {...register("priceRegex")}
                  />
                  <p className="text-xs text-base-content/40">Extract only the price value.</p>
                </div>
              </div>

              {/* Title Section */}
              <div className="p-5 rounded-xl bg-base-300/20 border border-white/5 space-y-4">
                <SectionHeader icon={FaBook} title="Title Extraction" />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70">Title XPath</label>
                  <input
                    type="text"
                    placeholder="//h1[@id='productTitle']"
                    className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                      errors.titleXPath ? "border-error/50" : ""
                    }`}
                    {...register("titleXPath")}
                  />
                  {errors.titleXPath && (
                    <span className="text-error text-xs">{errors.titleXPath.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70">Title Cleanup Regex</label>
                  <input
                    type="text"
                    placeholder=".*"
                    className="input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    {...register("titleRegex")}
                  />
                </div>
              </div>

              {/* Image Section */}
              <div className="p-5 rounded-xl bg-base-300/20 border border-white/5 space-y-4">
                <SectionHeader icon={FaImage} title="Image Extraction" />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70">Image XPath</label>
                  <input
                    type="text"
                    placeholder="//img[@id='main-image']/@src"
                    className={`input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                      errors.imageXPath ? "border-error/50" : ""
                    }`}
                    {...register("imageXPath")}
                  />
                  {errors.imageXPath && (
                    <span className="text-error text-xs">{errors.imageXPath.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-base-content/70">Image Cleanup Regex</label>
                  <input
                    type="text"
                    placeholder="https?://.*"
                    className="input input-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300"
                    {...register("imageRegex")}
                  />
                </div>
              </div>

              {/* Currency */}
              <div className="space-y-3">
                <SectionHeader icon={FaGlobe} title="Currency" />
                <select
                  className={`select select-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.currency ? "border-error/50" : ""
                  }`}
                  {...register("currency")}
                  disabled={currenciesLoading}
                >
                  <option value="">
                    {currenciesLoading ? "Loading currencies..." : "Select a currency"}
                  </option>
                  {currencies?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.currency_name} ({c.currency_symbol})
                    </option>
                  ))}
                </select>
                {errors.currency && (
                  <span className="text-error text-xs">{errors.currency.message}</span>
                )}
              </div>

              {/* Library */}
              <div className="space-y-3">
                <SectionHeader icon={FaWrench} title="Library Type" />
                <select
                  className={`select select-bordered w-full bg-base-200 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-300 ${
                    errors.lib ? "border-error/50" : ""
                  }`}
                  {...register("lib")}
                >
                  {LIBRARY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.lib && (
                  <span className="text-error text-xs">{errors.lib.message}</span>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn btn-primary w-full gap-2"
                  disabled={addScraper.isPending}
                >
                  <FaSave className="w-4 h-4" />
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
