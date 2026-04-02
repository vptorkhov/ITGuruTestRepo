import styles from "./NotFoundPage.module.css";
import clsx from "clsx";

export default function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1 className={clsx(styles.title, "h1")}>404 - Page Not Found</h1>
    </div>
  );
}
