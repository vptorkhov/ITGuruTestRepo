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

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [pageNumber, setPageNumber] = useState(1);
  const [order, _setOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, _setSortBy] = useState<
    "title" | "brand" | "sku" | "rating" | "price" | null
  >(null);

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
    console.log(data);
  }, [data]);

  return (
    <div className={styles.page}>
      <TitleBlock searchValue={search} onSearchChange={setSearch} />
      <div className={styles.body}>
        <Menu refreshData={refreshData} />
        <GoodsList products={data?.products || []} isLoading={isLoading} />
        <PaginationBlock
          total={data?.total || 0}
          itemsPerPage={ProductsPerPage}
          currentPageNumber={pageNumber}
          className={styles.navigation}
          setCurrentPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}
