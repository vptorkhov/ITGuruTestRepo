"use client";
import React from "react";
import styles from "./button.module.css";
import clsx from "clsx";
import { TButton } from "./Button";

const fontSize = {
  l: "text-xl-semi",
  m: "text-l-semi",
  s: "text-m-semi",
  xs: "text-s-semi",
};

function ButtonDiv({
  text,
  leftIcon,
  rightIcon,
  variant = "primary",
  styleVariant = "fill",
  addClass,
  onClick,
  size = "m",
  mobSize,
  disabled,
  onlyIcon,
}: TButton) {
  return (
    <div
      className={clsx(
        styles[variant],
        styles["button"],
        styles[styleVariant],
        addClass,
        styles[size],
        disabled && styles["disabled"],
        onlyIcon && styles["only-icon"],
        mobSize && styles[`mob-${mobSize}`]
      )}
      onClick={() => (onClick ? onClick() : undefined)}
    >
      {leftIcon}
      <span className={clsx(fontSize[size], mobSize && `${fontSize[mobSize]}-mob`)}>{text}</span>
      {rightIcon}
    </div>
  );
}

export default ButtonDiv;
