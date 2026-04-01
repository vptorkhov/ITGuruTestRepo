import React from "react";
import styles from "./button.module.css";
import clsx from "clsx";
import { Link } from "react-router";

export type TButtonLink = {
  text?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "primary" | "neutral";
  addClass?: string;
  onClick?: () => void;
  styleVariant?: "fill" | "ghost" | "stroke" | "clear";
  size?: "m" | "l" | "s" | "xs";
  mobSize?: "m" | "l" | "s" | "xs";
  href: string;
  disabled?: boolean;
  onlyIcon?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  download?: boolean;
};

const fontSize = {
  l: "text-xl-semi",
  m: "text-l-semi",
  s: "text-m-semi",
  xs: "text-s-semi",
};

function ButtonLink({
  text,
  leftIcon,
  rightIcon,
  variant = "primary",
  addClass,
  href,
  size = "m",
  mobSize,
  disabled,
  onlyIcon,
  target = "_self",
  onClick = () => {},
  styleVariant = "fill",
  download,
}: TButtonLink) {
  return (
    <Link
      to={href}
      target={target}
      onClick={onClick}
      className={clsx(
        styles[variant],
        styles["button"],
        styles[styleVariant],
        addClass,
        styles[size],
        disabled && styles["disabled"],
        onlyIcon && styles["only-icon"],
        mobSize && styles[`mob-${mobSize}`],
      )}
      download={download}
    >
      {leftIcon}
      <span
        className={clsx(fontSize[size], mobSize && `${fontSize[mobSize]}-mob`)}
      >
        {text}
      </span>
      {rightIcon}
    </Link>
  );
}

export default ButtonLink;
