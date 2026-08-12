import axios from "axios";
import type { Product } from "../types/Product";
import type { LoginPayload, LoginResponse } from "../types/User";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export async function getAllProducts(): Promise<Product[]> {
  const response = await api.get("/products");
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function getCategories(): Promise<string[]> {
  const response = await api.get("/products/categories");
  return response.data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post("/auth/login", payload);
  return response.data;
}