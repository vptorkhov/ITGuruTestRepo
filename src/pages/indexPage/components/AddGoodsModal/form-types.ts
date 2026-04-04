import z from "zod";

export const AddGoodsModalFormSchema = z.object({
  title: z.string().min(1, "Введите название"),
  brand: z.string().min(1, "Введите бренд"),
  sku: z.string().min(1, "Введите артикул"),
  price: z
    .string()
    .min(1, "Введите цену")
    .refine((value) => {
      const numberValue = parseFloat(value);
      return !isNaN(numberValue) && numberValue >= 0;
    }, "Цена должна быть числом и не может быть отрицательной"),
  rating: z
    .string()
    .min(1, "Введите рейтинг")
    .refine((value) => {
      const numberValue = parseFloat(value);
      return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 5;
    }, "Рейтинг должен быть числом от 0 до 5"),
});

export type TAddGoodsModalForm = z.infer<typeof AddGoodsModalFormSchema>;
