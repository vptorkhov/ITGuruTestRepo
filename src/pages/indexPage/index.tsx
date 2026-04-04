import { useCallback, useEffect, useState } from "react";
import TitleBlock from "./components/TitleBlock/TitleBlock";
import styles from "./IndexPage.module.css";
import Menu from "./components/Menu/Menu";
import PaginationBlock from "./components/PaginationBlock/PaginationBlock";
import { getProducts } from "@/services/products/products.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductsPerPage } from "@/constants/products.constants";
import { useDebounce } from "@/hooks/useDebounce";
import GoodsList from "./components/GoodsList/GoodsList";
import { getStorageData, saveStorageData } from "@/utils/utils";
import AddGoodsModal from "./components/AddGoodsModal/AddGoodsModal";
import Toast from "@/ui/Toast/Toast";

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [pageNumber, setPageNumber] = useState(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<
    "title" | "brand" | "sku" | "rating" | "price" | null
  >(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goodsAdded, setGoodsAdded] = useState(false);

  const openModal = useCallback(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    document.querySelector("body")?.classList.remove("overflow-hidden");
    setIsModalOpen(false);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["products", pageNumber, sortBy, order, debouncedSearch],
    queryFn: () =>
      getProducts(
        ProductsPerPage,
        (pageNumber - 1) * ProductsPerPage,
        sortBy,
        order,
        debouncedSearch,
      ),
  });

  const queryClient = useQueryClient();

  const refreshData = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["products", pageNumber, sortBy, order, debouncedSearch],
    });
  }, [queryClient, pageNumber, sortBy, order, debouncedSearch]);

  useEffect(() => {
    if (pageNumber !== 1) {
      setPageNumber(1);
    }
  }, [debouncedSearch, sortBy, order]);

  useEffect(() => {
    const savedSortBy = getStorageData("sortBy") as
      | "title"
      | "brand"
      | "sku"
      | "rating"
      | "price"
      | null;
    const savedOrder = getStorageData("order") as "asc" | "desc" | null;
    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
    if (savedOrder) {
      setOrder(savedOrder);
    }
  }, []);

  useEffect(() => {
    if (sortBy) {
      saveStorageData("sortBy", sortBy, true);
    }
  }, [sortBy]);

  useEffect(() => {
    if (order) {
      saveStorageData("order", order, true);
    }
  }, [order]);

  return (
    <div className={styles.page}>
      <TitleBlock searchValue={search} onSearchChange={setSearch} />
      <div className={styles.body}>
        <Menu refreshData={refreshData} openModal={openModal} />
        <GoodsList
          products={data?.products || []}
          isLoading={isLoading}
          order={order}
          setOrder={setOrder}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <PaginationBlock
          total={data?.total || 0}
          itemsPerPage={ProductsPerPage}
          currentPageNumber={pageNumber}
          className={styles.navigation}
          setCurrentPageNumber={setPageNumber}
        />
      </div>
      {isModalOpen && (
        <AddGoodsModal
          closeModal={closeModal}
          setGoodsAdded={setGoodsAdded}
          refreshData={refreshData}
        />
      )}
      <Toast
        active={goodsAdded}
        onClose={() => setGoodsAdded(false)}
        title="Товар добавлен"
      />
    </div>
  );
}
