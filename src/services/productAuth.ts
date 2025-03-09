import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../types/types";
import axiosInstance from "./api";

const API_URL = "http://localhost:5000/products";

export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product[]>(API_URL);
      return data;
    },
  });
};

export const useGetProductById = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product>(`${API_URL}/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, Product>({
    mutationFn: async (newProduct: Product) => {
      const { data } = await axiosInstance.post<Product>(API_URL, newProduct);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({id,product}: {id:any,product:Product}) => {
      
      const { data } = await axiosInstance.put<Product>(`${API_URL}/${id}`, product);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
