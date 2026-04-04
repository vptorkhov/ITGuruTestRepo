import clsx from "clsx";
import styles from "./GoodsRow.module.css";
import Checkbox from "@/ui/Checkbox/Checkbox";
import { useState } from "react";
import type { TProduct } from "@/services/products/products.types";
import { splitNumberToParts } from "./utils/goods-row.utils";
import PlusIcon from "@/icons/PlusIcon";
import ThreeDotCircleIcon from "@/icons/ThreeDotCircleIcon";

type TGoodsItemRowProps = {
  product: TProduct;
};

export default function GoodsItemRow({ product }: TGoodsItemRowProps) {
  const [checked, setChecked] = useState(false);
  const productPriceArr = splitNumberToParts(product.price);
  return (
    <div
      className={clsx(styles.itemRow, styles.row, checked && styles.checked)}
    >
      <div className={styles.checkWrap}>
        <Checkbox
          value={checked}
          onChange={(e) => setChecked(e.target.checked)}
          productCheck
        />
      </div>
      <div className={styles.nameWrap}>
        <div className={styles.goodsImg}>
          <img src={product.images[0]} alt={`Изображение ${product.title}`} />
        </div>
        <div className={styles.titleWrap}>
          <div className={clsx("text-l-semi", styles.title)}>
            {product.title}
          </div>
          <div className="text-m text-secondary text-thin">
            {product.category}
          </div>
        </div>
      </div>
      <div className={styles.infoWrap}>
        <div className="text-l-semi">{product.brand}</div>
      </div>
      <div className={styles.infoWrap}>
        <div className="text-l text-thin">{product.sku}</div>
      </div>
      <div className={styles.infoWrap}>
        <div className="text-l text-thin">
          <span className={clsx(product.rating < 3.5 && "text-error")}>
            {product.rating}
          </span>
          /5
        </div>
      </div>
      <div className={styles.infoWrap}>
        <div className="text-l text-thin">
          {productPriceArr[0]}
          <span className="text-secondary">,{productPriceArr[1]}</span>
        </div>
      </div>
      <div className={styles.btnsWrap}>
        <button type="button" title="Плюс" className={styles.plusBtn}>
          <PlusIcon />
        </button>
        <button type="button" title="Еще" className={styles.dotsBtn}>
          <ThreeDotCircleIcon />
        </button>
      </div>
    </div>
  );
}
