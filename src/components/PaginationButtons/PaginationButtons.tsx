import clsx from "clsx";
import styles from "./PaginationButtons.module.css";
import ChewronLeftIcon from "@/icons/ChewronLeftIcon";
import ChewronRightIcon from "@/icons/ChewronRightIcon";
import { getVisiblePages } from "./utils";

type TPaginationButtonsProps = {
  currentPageNumber: number;
  totalPages: number;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function PaginationButtons({
  currentPageNumber,
  setCurrentPageNumber,
  totalPages,
}: TPaginationButtonsProps) {
  const changePageToPrev = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber((prev) => prev - 1);
    }
  };
  const changePageToNext = () => {
    if (currentPageNumber < totalPages) {
      setCurrentPageNumber((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={clsx(
          styles.arrowBtn,
          currentPageNumber <= 1 && styles.arrowBtnDisabled,
        )}
        onClick={changePageToPrev}
      >
        <ChewronLeftIcon />
      </button>
      <div className={styles.btnsWrap}>
        {getVisiblePages(currentPageNumber, totalPages).map((item, index) =>
          item === "start-ellipsis" || item === "end-ellipsis" ? (
            <button
              key={item}
              type="button"
              className={clsx(styles.btn, styles.btnDisabled)}
            >
              <span>...</span>
            </button>
          ) : (
            <button
              key={index}
              type="button"
              className={clsx(
                styles.btn,
                currentPageNumber === item && styles.btnActive,
              )}
              onClick={() => {
                setCurrentPageNumber(item);
              }}
            >
              <span>{item}</span>
            </button>
          ),
        )}
      </div>
      <button
        type="button"
        className={clsx(
          styles.arrowBtn,
          currentPageNumber >= totalPages && styles.arrowBtnDisabled,
        )}
        onClick={changePageToNext}
      >
        <ChewronRightIcon />
      </button>
    </div>
  );
}
