import api from "./client"; // adjust the path if your base client is in another folder
import { Currency } from "./types";

const BASE_URL = "/products/currencies/";

// ✅ Get all currencies
export const getCurrencies = async (): Promise<Currency[]> => {
  const res = await api.get(BASE_URL);
  return res.data;
};

// ✅ Create a currency
export const createCurrency = async (data: Currency): Promise<Currency> => {
  const res = await api.post(BASE_URL, data);
  return res.data;
};

// ✅ Update a currency
export const updateCurrency = async (
  id: number,
  data: Partial<Currency>
): Promise<Currency> => {
  const res = await api.put(`${BASE_URL}${id}/`, data);
  return res.data;
};

// ✅ Delete a currency
export const deleteCurrency = async (id: number): Promise<void> => {
  await api.delete(`${BASE_URL}${id}/`);
};
