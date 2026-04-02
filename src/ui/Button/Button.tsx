import React from "react";
import styles from "./button.module.css";
import clsx from "clsx";

export type TButton = {
	text?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	variant?: "primary" | "neutral";
	styleVariant?: "fill" | "ghost" | "stroke" | "clear";
	className?: string;
	size?: "m" | "l" | "s" | "xs";
	mobSize?: "m" | "l" | "s" | "xs";
	onClick?: () => void;
	disabled?: boolean;
	onlyIcon?: boolean;
	type?: "button" | "submit" | "reset" | undefined;
};

const fontSize = {
	l: "text-xl-semi",
	m: "text-l-semi",
	s: "text-m-semi",
	xs: "text-s-semi",
};

function Button({
	text,
	leftIcon,
	rightIcon,
	variant = "primary",
	styleVariant = "fill",
	className,
	onClick,
	size = "m",
	mobSize,
	disabled,
	onlyIcon,
	type = "button",
}: TButton) {
	return (
		<button
			className={clsx(
				styles[variant],
				styles["button"],
				styles[styleVariant],
				className,
				styles[size],
				disabled && styles["disabled"],
				onlyIcon && styles["only-icon"],
				mobSize && styles[`mob-${mobSize}`],
			)}
			onClick={() => (onClick ? onClick() : undefined)}
			type={type}
		>
			{leftIcon}
			<span
				className={clsx(
					fontSize[size],
					mobSize && `${fontSize[mobSize]}-mob`,
				)}
			>
				{text}
			</span>
			{rightIcon}
		</button>
	);
}

export default Button;
