import { z } from "zod";

// Схема для размеров (dimensions)
const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

// Схема для отзыва (review)
const ReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string(),
  date: z.string().datetime(), // ISO 8601
  reviewerName: z.string(),
  reviewerEmail: z.string().email(),
});

// Схема для мета-данных (meta)
const MetaSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  barcode: z.string(),
  qrCode: z.string(),
});

// Основная схема продукта
const ProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number().positive(),
  discountPercentage: z.number().min(0).max(100),
  rating: z.number().min(0).max(5),
  stock: z.number().int().min(0),
  tags: z.array(z.string()),
  brand: z.string().nullish().optional(),
  sku: z.string(),
  weight: z.number().positive(),
  dimensions: DimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number().int().min(1),
  meta: MetaSchema,
  thumbnail: z.string().url(),
  images: z.array(z.string().url()),
});

// Тип, выведенный из схемы
export type TProduct = z.infer<typeof ProductSchema>;

export const ProductResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type TProductResponse = z.infer<typeof ProductResponseSchema>;

