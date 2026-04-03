import Button from "@/ui/Button/Button";
import styles from "./Menu.module.css";
import RefreshIcon from "@/icons/RefreshIcon";
import PlusCircleIcon from "@/icons/PlusCircleIcon";

export default function Menu() {
  return (
    <div className={styles.wrap}>
      <div className="h4">Все позиции</div>
      <div className={styles.btnsWrap}>
        <Button
          type="button"
          variant="neutral"
          size="m"
          styleVariant="stroke"
          onlyIcon
          leftIcon={<RefreshIcon />}
        />
        <Button
          size={"m"}
          variant="primary"
          text="Добавить"
          leftIcon={<PlusCircleIcon />}
        />
      </div>
    </div>
  );
}
