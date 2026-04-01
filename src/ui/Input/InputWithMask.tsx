"use client";
import React from "react";
import styles from "./input.module.css";
import { TInput } from "./Input";
import clsx from "clsx";
import MaskedInput, { MaskedInputProps } from "react-text-mask";

export type TMaskedInput = TInput & {
  mask: MaskedInputProps["mask"];
};

const fontSize = {
  xs: "text-s",
  s: "text-m",
  m: "text-l",
  l: "text-xl",
};
const fontTitleSize = {
  xs: "text-s",
  s: "text-s",
  m: "text-m",
  l: "text-l",
};

function InputWithMask({
  value,
  onChange,
  placeholder = "",
  type = "text",
  size = "m",
  disable = false,
  error,
  addClass = "",
  onBlur = () => {},
  ariaLabel = "",
  icon,
  mask,
  title,
  required = false,
  caption,
  maxLength = 500,
  onKeyPress = () => {},
}: TMaskedInput) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onKeyPress();
    }
  };
  return (
    <div
      className={clsx(
        styles.block,
        error && "input-with-error",
        disable && styles.disable
      )}
    >
      {title && (
        <div className={clsx(fontTitleSize[size])}>
          {title}
          {required && <span className={styles.requiredSymbol}> *</span>}
        </div>
      )}
      <div
        className={clsx(
          styles.wrap,
          styles[size],
          "d-flex",
          error && styles.error,
          disable && styles.disabled,
          addClass
        )}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <MaskedInput
          mask={mask}
          aria-label={ariaLabel}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => onChange(e?.target.value)}
          className={clsx(styles["input"], fontSize[size])}
          onBlur={onBlur}
          maxLength={maxLength}
          onKeyDown={handleKeyPress}
        />
      </div>
      {caption && !error?.message && (
        <div className="text-s text-secondary">{caption}</div>
      )}
      {error?.message && (
        <div className={clsx("text-s", styles.error)}>{error?.message}</div>
      )}
    </div>
  );
}

export default InputWithMask;
