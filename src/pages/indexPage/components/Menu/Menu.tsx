import Button from "@/ui/Button/Button";
import styles from "./Menu.module.css";
import RefreshIcon from "@/icons/RefreshIcon";
import PlusCircleIcon from "@/icons/PlusCircleIcon";

type TMenuProps = {
  refreshData: () => void;
  openModal: () => void;
};

export default function Menu({ refreshData, openModal }: TMenuProps) {
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
          onClick={refreshData}
        />
        <Button
          size={"m"}
          variant="primary"
          text="Добавить"
          leftIcon={<PlusCircleIcon />}
          onClick={openModal}
        />
      </div>
    </div>
  );
}
