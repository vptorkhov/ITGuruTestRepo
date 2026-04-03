import type { TProduct } from "@/services/products/products.types";
import styles from "./GoodsList.module.css";
import clsx from "clsx";

type TGoodsListProps = {
  products: TProduct[];
  isLoading: boolean;
};

export default function GoodsList({ products, isLoading }: TGoodsListProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        <div className={clsx(styles.row, styles.headRow)}></div>
        {isLoading ? (
          <div className="text-xl">Loading...</div>
        ) : (
          products.map((product) => (
            <div
              key={"product-item-" + product.id}
              className={clsx(styles.row, styles.itemRow)}
            ></div>
          ))
        )}
      </div>
    </div>
  );
}
