import CloseCross from "@/icons/CloseCross";
import styles from "./AddGoodsModal.module.css";
import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { AddGoodsModalFormSchema, type TAddGoodsModalForm } from "./form-types";
import Input from "@/ui/Input/Input";
import Button from "@/ui/Button/Button";
import { useState } from "react";
import { addProduct } from "@/services/products/products.service";

type TAddGoodsModalProps = {
  closeModal: () => void;
  setGoodsAdded: React.Dispatch<React.SetStateAction<boolean>>;
  refreshData: () => void;
};

export default function AddGoodsModal({
  closeModal,
  setGoodsAdded,
  refreshData,

}: TAddGoodsModalProps) {
  const formMethods = useForm({
    defaultValues: {
      title: "",
      brand: "",
      sku: "",
      price: "",
      rating: "",
    },
    resolver: zodResolver(AddGoodsModalFormSchema),
  });

  const {
    control,
    formState: { isValid, errors },
    trigger,
  } = formMethods;

  const dataInForm = useWatch({ control });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    await trigger();
    if (isValid) {
      setIsLoading(true);
      try {
        const res = await addProduct(dataInForm as TAddGoodsModalForm);
        if (res) {
          setGoodsAdded(true);
          refreshData();
          closeModal();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  }
  return (
    <div className={styles.modal}>
      <div className={styles.formWrapper}>
        <button onClick={closeModal} className={styles.closeBtn}>
          <CloseCross />
        </button>
        <div className={clsx("h3", styles.title)}>Добавить товар</div>
        <Controller
          name="title"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Введите название"
              size="l"
              title="Название"
              name="title"
              onBlur={() => trigger("title")}
              error={errors?.title}
            />
          )}
        />
        <Controller
          name="brand"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Введите бренд"
              size="l"
              title="Бренд"
              name="brand"
              onBlur={() => trigger("brand")}
              error={errors?.brand}
            />
          )}
        />
        <Controller
          name="sku"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Введите артикул"
              size="l"
              title="Артикул"
              name="sku"
              onBlur={() => trigger("sku")}
              error={errors?.sku}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Введите цену"
              size="l"
              title="Цена"
              name="price"
              onBlur={() => trigger("price")}
              error={errors?.price}
            />
          )}
        />
        <Controller
          name="rating"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Введите рейтинг"
              size="l"
              title="Рейтинг"
              name="rating"
              onBlur={() => trigger("rating")}
              error={errors?.rating}
            />
          )}
        />
        <Button
          text="Добавить товар"
          size="l"
          className={styles.btn}
          onClick={onSubmit}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
