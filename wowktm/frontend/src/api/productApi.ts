import axiosClient from './axiosClient';
import { Product } from '../types/product';

export const getProducts = async (page: number): Promise<Product[]> => {
  const response = await axiosClient.get(`/products?page=${page}&size=8`);
  return response.data;
};