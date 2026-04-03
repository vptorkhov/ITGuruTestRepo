import clsx from "clsx";
import styles from "./PaginationBlock.module.css";
import PaginationButtons from "@/components/PaginationButtons/PaginationButtons";

type TPaginationBlockProps = {
  total: number;
  itemsPerPage: number;
  currentPageNumber: number;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

export default function PaginationBlock({
  total,
  itemsPerPage,
  currentPageNumber,
  setCurrentPageNumber,
  className = "",
}: TPaginationBlockProps) {
  return (
    <div className={clsx(styles.wrap, className)}>
      <div className="text-xl text-secondary">
        Показано{" "}
        <span className="text-base">
          {1 + (currentPageNumber - 1) * itemsPerPage} -{" "}
          {itemsPerPage * currentPageNumber > total
            ? total
            : itemsPerPage * currentPageNumber}
        </span>{" "}
        из <span className="text-base">{total}</span>
      </div>
      <PaginationButtons
        currentPageNumber={currentPageNumber}
        totalPages={Math.ceil(total / itemsPerPage)}
        setCurrentPageNumber={setCurrentPageNumber}
      />
    </div>
  );
}
