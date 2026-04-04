import React, { type ReactNode } from "react";
import styles from "./checkbox.module.css";
import cx from "clsx";
import Check from "@/icons/Check";
import type { FieldError } from "react-hook-form";

export type TCheckbox = {
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode | null;
  size?: "xs" | "s" | "m" | "l";
  addClass?: string;
  align?: "center" | "start";
  error?: FieldError;
  checkboxRef?: React.RefObject<HTMLDivElement | null>;
  disable?: boolean;
  productCheck?: boolean;
};

export default function Checkbox({
  value,
  onChange,
  label = null,
  addClass,
  size = "m",
  align = "start",
  error,
  checkboxRef,
  disable = false,
  productCheck = false,
}: TCheckbox) {
  return (
    <div
      className={cx(
        value && styles.checked,
        error && "input-with-error",
        addClass,
        disable && styles.disable,
        productCheck && styles.productCheck,
      )}
      ref={checkboxRef}
    >
      <label
        className={cx(styles["checkbox-tag"], styles[size], styles[align])}
      >
        <input
          checked={value}
          value={value ? 1 : 0}
          onChange={(e) => onChange(e)}
          type="checkbox"
          className={styles.checkbox}
        />
        <div className={cx(styles["size-" + size], styles.box)}>
          {value && !productCheck && <Check />}
        </div>
        {label}
      </label>
      {error?.message && (
        <div className={cx("text-s", styles.error, styles[`error-${size}`])}>
          {error?.message}
        </div>
      )}
    </div>
  );
}
