import type { TAddGoodsModalForm } from "@/pages/indexPage/components/AddGoodsModal/form-types";
import { axiosInstance } from "../axiosInstance";
import { ProductResponseSchema, type TProductResponse } from "./products.types";

export async function getProducts(
  limit: number = 20,
  skip: number = 0,
  sortBy?: "title" | "brand" | "sku" | "rating" | "price" | null,
  order: "asc" | "desc" = "asc",
  search?: string | null,
): Promise<TProductResponse> {
  const res = await axiosInstance.get(
    `/products${search ? `/search?q=${search}&` : "?"}${limit ? `limit=${limit}&` : ""}${skip ? `skip=${skip}&` : ""}${sortBy ? `sortBy=${sortBy}&order=${order}` : ""}`,
  );
  try {
    ProductResponseSchema.parse(res.data);
  } catch {
    throw new Error("Неверные данные с сервера, /products");
  }
  return res.data;
}

export async function addProduct(data: TAddGoodsModalForm) {
  const res = await axiosInstance.post("/products/add", data);
  return res.data;
}
