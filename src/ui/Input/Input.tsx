"use client";
import React, { useState, type ReactNode, type RefObject } from "react";
import cx from "clsx";
import styles from "./input.module.css";
import type { FieldError } from "react-hook-form";
import CloseCross from "@/icons/CloseCross";
import EyeIcon from "@/icons/EyeIcon";
import clsx from "clsx";

const validateLettersOnly = (value: string): string => {
  return value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-–—]/g, "");
};

const validateDigitsOnly = (value: string): string => {
  // Удаляем все не-цифры
  return value.replace(/\D/g, "");
};

const validateLatinCyrillicDigitsOnly = (value: string): string => {
  return value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-–—\d]/g, "");
};

export type TInput = {
  title?: string;
  icon?: ReactNode;
  value: string | undefined;
  onChange: (arg: string) => void;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "letters-only"
    | "digits-only"
    | "latin-cyrillic-digits-only";
  placeholder?: string;
  size?: "m" | "s" | "l" | "xs";
  disable?: boolean;
  error?: FieldError;
  addClass?: string;
  onBlur?: (...rest: unknown[]) => void;
  onFocus?: (...rest: unknown[]) => void;
  maxLength?: number;
  ariaLabel?: string;
  required?: boolean;
  name?: string;
  clearBtn?: boolean;
  caption?: string;
  onKeyPress?: () => void;
  ref?: RefObject<HTMLInputElement | null>;
};

const fontSize = {
  xs: "text-s",
  s: "text-m",
  m: "text-l",
  l: "text-xl",
};

function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  size = "m",
  disable = false,
  error,
  addClass = "",
  onBlur = () => {},
  onFocus = () => {},
  ariaLabel = "",
  icon,
  title,
  required = false,
  name = "",
  clearBtn = false,
  caption,
  onKeyPress = () => {},
  maxLength = 500,
  ref,
}: TInput) {
  const [isPasswordHovered, setIsPasswordHovered] = useState(false);
  const [isPasswordToggled, setIsPasswordToggled] = useState(false);

  const isPasswordField = type === "password";
  const isPasswordVisible =
    isPasswordField && (isPasswordHovered || isPasswordToggled);

  const inputType =
    type === "letters-only" ||
    type === "digits-only" ||
    type === "latin-cyrillic-digits-only"
      ? "text"
      : isPasswordVisible
        ? "text"
        : type;

  const handleChange = (inputValue: string) => {
    if (type === "letters-only") {
      // Фильтруем ввод, оставляя только буквы
      const filteredValue = validateLettersOnly(inputValue);
      onChange(filteredValue);
    } else if (type === "digits-only") {
      const filteredValue = validateDigitsOnly(inputValue);
      onChange(filteredValue);
    } else if (type === "latin-cyrillic-digits-only") {
      const filteredValue = validateLatinCyrillicDigitsOnly(inputValue);
      onChange(filteredValue);
    } else {
      onChange(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onKeyPress();
    }
  };

  const handlePasswordTogglePointerUp = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (e.pointerType !== "mouse") {
      setIsPasswordToggled((prev) => !prev);
    }
  };

  return (
    <div
      className={cx(
        styles.block,
        error && "input-with-error",
        disable && styles.disable,
      )}
    >
      {title && (
        <div className={fontSize[size]}>
          {title}
          {required && <span className={styles.requiredSymbol}> *</span>}
        </div>
      )}
      <div
        className={cx(
          styles.wrap,
          styles[size],
          "d-flex",
          error && styles.error,
          disable && styles.disabled,
          addClass,
        )}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          aria-label={ariaLabel}
          placeholder={placeholder}
          type={inputType}
          ref={ref}
          value={value}
          onChange={(e) => handleChange(e?.target.value)}
          className={cx(styles["input"], fontSize[size])}
          onBlur={onBlur}
          name={name}
          pattern={
            type === "letters-only"
              ? "[a-zA-Zа-яА-ЯёЁ\\s\\-–—]*"
              : type === "digits-only"
                ? "[0-9]*"
                : undefined
          }
          inputMode={type === "digits-only" ? "numeric" : undefined}
          onKeyDown={handleKeyPress}
          maxLength={maxLength}
          onFocus={onFocus}
        />
        {isPasswordField ? (
          <div
            className={styles.clearBtnWrap}
            onMouseEnter={() => setIsPasswordHovered(true)}
            onMouseLeave={() => setIsPasswordHovered(false)}
          >
            <button
              type="button"
              title={isPasswordVisible ? "Скрыть пароль" : "Показать пароль"}
              aria-label={
                isPasswordVisible ? "Скрыть пароль" : "Показать пароль"
              }
              aria-pressed={isPasswordVisible}
              className={clsx(styles.clearBtn, styles.eyeComponent)}
              onPointerUp={handlePasswordTogglePointerUp}
            >
              <EyeIcon />
            </button>
          </div>
        ) : (
          clearBtn &&
          value && (
            <div className={styles.clearBtnWrap}>
              <button
                type="button"
                title="Очистить"
                className={styles.clearBtn}
                onClick={() => onChange("")}
              >
                <CloseCross />
              </button>
            </div>
          )
        )}
      </div>
      {caption && !error?.message && (
        <div className="text-s text-secondary">{caption}</div>
      )}
      {error?.message && (
        <div className={cx("text-s", styles.error)}>{error?.message}</div>
      )}
    </div>
  );
}

export default Input;
