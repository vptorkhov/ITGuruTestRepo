import type { TProduct } from "@/services/products/products.types";
import styles from "./GoodsList.module.css";
import GoodsHeadRow from "./GoodsRow/GoodsHeadRow";
import GoodsItemRow from "./GoodsRow/GoodsItemRow";

type TGoodsListProps = {
  products: TProduct[];
  isLoading: boolean;
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
  sortBy: "title" | "brand" | "sku" | "rating" | "price" | null;
  setSortBy: (
    sortBy: "title" | "brand" | "sku" | "rating" | "price" | null,
  ) => void;
};

export default function GoodsList({
  products,
  isLoading,
  order,
  setOrder,
  sortBy,
  setSortBy,
}: TGoodsListProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.list}>
        <GoodsHeadRow
          order={order}
          setOrder={setOrder}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {isLoading ? (
          <div className="text-xl">Loading...</div>
        ) : (
          products.map((product) => (
            <GoodsItemRow key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
