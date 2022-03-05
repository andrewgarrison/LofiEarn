import * as React from "react";
import { LoadingIcon } from "../icons/Loading";

type Variants = "primary" | "secondary" | "danger" | "ghost" | "neutral" | "link";
type Sizes = "sm" | "md" | "lg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variants;
  size?: Sizes;
  isLoading?: boolean;
  children?: string | React.ReactNode;
  className?: string;
  iconOnly?: boolean;
}

export const Button = (props: Props) => {
  const {
    variant = "primary",
    size = "md",
    isLoading = false,
    iconOnly = false,
    disabled = false,
    className,
    children,
    ...rest
  } = props;
  const baseStyles = "font-medium rounded-lg text-center focus:ring-4";
  const variants: Record<Variants, string> = {
    primary:
      "text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800",
    secondary:
      "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
    danger:
      "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    ghost:
      "fill-gray-300 bg-transparent border border-gray-200 hover:bg-gray-100 hover:fill-gray-400 focus:z-10 focus:ring-2 focus:ring-gray-400 focus:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700",
    neutral: "text-white bg-black hover:bg-gray-900 focus:ring-purple-300 dark:bg-white dark:text-black dark:hover:bg-gray-50 dark:focus:ring-purple-800",
    link: "text-black bg-transparent hover:text-gray-900 hover:underline focus:ring-purple-300 dark:text-white dark:hover:text-gray-50 dark:focus:ring-purple-800",
  };
  const sizes: Record<Sizes, string> = {
    sm: iconOnly ? "p-2" : "py-2 px-3 text-sm",
    md: iconOnly ? "p-3" : "py-2.5 px-5 text-sm",
    lg: iconOnly ? "p-4" : "py-3 px-5 text-base",
  };

  const disabledStyle = disabled ? "opacity-50" : "";

  return (
    <button
      type="button"
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabledStyle}`}
      {...rest}
    >
      <div className="flex items-center justify-center gap-x-2">
        {isLoading && (
          <LoadingIcon
            size="sm"
            variant={variant === "secondary" ? "primary" : "default"}
          />
        )}
        {children}
      </div>
    </button>
  );
};
