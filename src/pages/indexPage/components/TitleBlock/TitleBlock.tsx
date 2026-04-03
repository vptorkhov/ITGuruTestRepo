import clsx from "clsx";
import styles from "./TitleBlock.module.css";
import Input from "@/ui/Input/Input";
import SearchIcon from "@/icons/SearchIcon";

type TTitleBlockProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function TitleBlock({
  searchValue,
  onSearchChange,
}: TTitleBlockProps) {
  return (
    <div className={styles.wrap}>
      <h1 className={clsx(styles.title, "h3")}>Товары</h1>
      <div className={styles.inputWrap}>
        <Input
          icon={<SearchIcon />}
          size="s"
          placeholder="Найти"
          value={searchValue}
          onChange={onSearchChange}
          addClass={styles.input}
          name="search"
        />
      </div>
      <div className={styles.void} />
    </div>
  );
}
