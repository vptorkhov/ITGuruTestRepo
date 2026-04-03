import { useState } from "react";
import TitleBlock from "./components/TitleBlock/TitleBlock";
import styles from "./IndexPage.module.css";
import Menu from "./components/Menu/Menu";
import PaginationBlock from "./components/PaginationBlock/PaginationBlock";

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className={styles.page}>
      <TitleBlock searchValue={search} onSearchChange={setSearch} />
      <div className={styles.body}>
        <Menu />
        <PaginationBlock
          total={255}
          itemsPerPage={20}
          currentPageNumber={pageNumber}
          className={styles.navigation}
          setCurrentPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}
