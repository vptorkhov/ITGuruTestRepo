import { useCallback, useEffect, useState } from "react";
import TitleBlock from "./components/TitleBlock/TitleBlock";
import styles from "./IndexPage.module.css";
import Menu from "./components/Menu/Menu";
import PaginationBlock from "./components/PaginationBlock/PaginationBlock";
import { getProducts } from "@/services/products/products.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductsPerPage } from "@/constants/products.constants";

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<
    "title" | "brand" | "sku" | "rating" | "price" | null
  >(null);

  const { data, isLoading } = useQuery({
    queryKey: ["products", pageNumber, sortBy, order],
    queryFn: () =>
      getProducts(
        ProductsPerPage,
        (pageNumber - 1) * ProductsPerPage,
        sortBy,
        order,
      ),
  });

  const queryClient = useQueryClient();

  const refreshData = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["products", pageNumber, sortBy, order],
    });
  }, [queryClient, pageNumber, sortBy, order]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles.page}>
      <TitleBlock searchValue={search} onSearchChange={setSearch} />
      <div className={styles.body}>
        <Menu refreshData={refreshData}/>
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
