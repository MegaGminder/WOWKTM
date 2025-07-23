import axiosClient from "./axiosClient";
import { Product } from "@/types/product";

export const fetchProducts = async (page = 1, limit = 20): Promise<Product[]> => {
  const res = await axiosClient.get<Product[]>(`/products?page=${page}&limit=${limit}`);
  return res.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axiosClient.get<Product>(`/products/${id}`);
  return res.data;
};
