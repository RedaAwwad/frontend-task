import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";

  /**
   * The size of the button.
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "icon";

  /**
   * Whether the button should show a loading spinner.
   * @default false
   */
  isLoading?: boolean;
}

const variantStyles = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 border border-transparent dark:focus:ring-offset-gray-900",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border border-transparent dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900",
  outline:
    "bg-transparent text-gray-700 hover:bg-gray-50 border border-gray-300 focus:ring-gray-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border border-transparent shadow-none hover:shadow-none dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent dark:focus:ring-offset-gray-900",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2.5 text-sm font-medium rounded-xl",
  lg: "px-6 py-3 text-base font-medium rounded-xl",
  icon: "p-2.5 rounded-xl flex items-center justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-sm";

    // Combine base styles, variant styles, size styles, and custom classes securely without Tailwind conflicts.
    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
      </button>
    );
  },
);

Button.displayName = "Button";
