import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const addProductSchema = z.object({
  url: z.string().url("Enter a valid URL"),
  threshold: z
    .string()
    .min(1, "Desired price is required")
    .refine((v) => !Number.isNaN(Number(v)) && Number(v) > 0, {
      message: "Enter a valid positive number",
    }),
  freq: z.enum(["", "3600", "14400", "86400"]).refine((val) => val !== "", {
    message: "Please select a valid frequency",
  }),
  channel: z.enum(["telegram", "gmail"]).refine((val) => !!val, {
    message: "Please select a channel",
  }),
});

export type AddProductFormValues = z.infer<typeof addProductSchema>;

export const scraperSchema = z.object({
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

export type ScraperFormValues = z.infer<typeof scraperSchema>;