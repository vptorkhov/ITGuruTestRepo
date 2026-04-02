"use client";
import React from "react";
import styles from "./input.module.css";
import type { TInput } from "./Input";
import clsx from "clsx";

export type TTextarea = Omit<TInput, "type"> & {
  rows?: number;
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

function Textarea({
  value,
  onChange,
  placeholder = "",
  size = "m",
  disable = false,
  error,
  addClass = "",
  onBlur = () => {},
  ariaLabel = "",
  icon,
  title,
  required = false,
  name = "",
  rows = 3,
  maxLength = 1000,
  caption,
  onKeyPress = () => {},
}: TTextarea) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        disable && styles.disable,
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
          addClass,
        )}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <textarea
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e?.target.value)}
          className={clsx(styles["input"], styles.textarea, fontSize[size])}
          onBlur={onBlur}
          name={name}
          rows={rows}
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

export default Textarea;
