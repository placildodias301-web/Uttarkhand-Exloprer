import { forwardRef } from "react";

const variants = {
  primary:
    "bg-moss-500 text-ink-950 hover:bg-moss-400 shadow-[0_10px_30px_-14px_rgba(45,226,197,0.6)]",
  outline:
    "border border-white/15 text-mist-100 hover:border-moss-500/60 hover:text-moss-400",
  ghost: "text-mist-200 hover:text-moss-400",
  dark: "bg-ink-800 text-mist-200 hover:bg-ink-700 border border-white/10",
  glass:
    "bg-ink-700/40 text-mist-100 border border-white/15 backdrop-blur-md hover:bg-ink-700/60 hover:border-white/25",
};

const sizes = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const Button = forwardRef(
  ({ as: Component = "button", variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
