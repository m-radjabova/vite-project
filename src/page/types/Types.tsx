
import { z } from "zod";
export interface ProductType {
  id: number;
  name: string;
  description: string;
  compound: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  weight: number;
}

export const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    compound: z.string().min(1, "Compound is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    imageUrl: z.string().url("Invalid URL format").min(1, "Image URL is required"),
    categoryId: z.string().min(1, "Category is required"),
    weight: z.number().min(1, "Weight must be greater than 0")
});

export interface CategoryType {
  id: string;
  name: string;
}

export interface CartItem {
  product: ProductType;
  count: number;
}


export interface CartItemForCart {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    weight?: number;
  };
  count: number;
}