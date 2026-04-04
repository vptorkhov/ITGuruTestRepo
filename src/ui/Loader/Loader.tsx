import SpinnerIcon from "@/icons/SpinnerIcon";
import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.icon}>
        <SpinnerIcon />
      </div>
    </div>
  );
}
