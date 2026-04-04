import clsx from "clsx";
import styles from "./GoodsRow.module.css";
import { useState } from "react";
import Checkbox from "@/ui/Checkbox/Checkbox";
import SortIcon from "@/icons/SortIcon";

type TProps = {
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
  sortBy: "title" | "brand" | "sku" | "rating" | "price" | null;
  setSortBy: (
    sortBy: "title" | "brand" | "sku" | "rating" | "price" | null,
  ) => void;
};

export default function GoodsHeadRow({
  order,
  setOrder,
  sortBy,
  setSortBy,
}: TProps) {
  const [checked, setChecked] = useState(false);

  function handleSortClick(
    column: "title" | "brand" | "sku" | "rating" | "price",
  ) {
    if (sortBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setOrder("asc");
    }
  }

  return (
    <div className={clsx(styles.headRow, styles.row)}>
      <div className={styles.checkWrap}>
        <Checkbox
          value={checked}
          onChange={(e) => setChecked(e.target.checked)}
          productCheck
        />
      </div>
      <div className={styles.nameWrap}>
        <div
          className={clsx("text-l-semi text-secondary", styles.menuTitle)}
          role="button"
          onClick={() => handleSortClick("title")}
        >
          Наименование
          {sortBy === "title" && (
            <div
              className={clsx(
                styles.menuBtn,
                order === "desc" && styles.menuBtnDesc,
              )}
            >
              <SortIcon />
            </div>
          )}
        </div>
      </div>
      <div className={styles.infoWrap}>
        <div
          className={clsx("text-l-semi text-secondary", styles.menuTitle)}
          role="button"
          onClick={() => handleSortClick("brand")}
        >
          Вендор
          {sortBy === "brand" && (
            <div
              className={clsx(
                styles.menuBtn,
                order === "desc" && styles.menuBtnDesc,
              )}
            >
              <SortIcon />
            </div>
          )}
        </div>
      </div>
      <div className={styles.infoWrap}>
        <div
          className={clsx("text-l-semi text-secondary", styles.menuTitle)}
          role="button"
          onClick={() => handleSortClick("sku")}
        >
          Артикул
          {sortBy === "sku" && (
            <div
              className={clsx(
                styles.menuBtn,
                order === "desc" && styles.menuBtnDesc,
              )}
            >
              <SortIcon />
            </div>
          )}
        </div>
      </div>
      <div className={styles.infoWrap}>
        <div
          className={clsx("text-l-semi text-secondary", styles.menuTitle)}
          role="button"
          onClick={() => handleSortClick("rating")}
        >
          Оценка
          {sortBy === "rating" && (
            <div
              className={clsx(
                styles.menuBtn,
                order === "desc" && styles.menuBtnDesc,
              )}
            >
              <SortIcon />
            </div>
          )}
        </div>
      </div>
      <div className={styles.infoWrap}>
        <div
          className={clsx("text-l-semi text-secondary", styles.menuTitle)}
          role="button"
          onClick={() => handleSortClick("price")}
        >
          Цена, ₽
          {sortBy === "price" && (
            <div
              className={clsx(
                styles.menuBtn,
                order === "desc" && styles.menuBtnDesc,
              )}
            >
              <SortIcon />
            </div>
          )}
        </div>
      </div>
      <div className={styles.btnsWrap} />
    </div>
  );
}
