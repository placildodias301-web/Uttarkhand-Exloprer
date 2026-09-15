import { forwardRef } from "react";

const variants = {
  primary:
    "bg-moss-500 text-ink-950 hover:bg-moss-400 shadow-[0_10px_30px_-10px_rgba(79,212,163,0.55)]",
  outline:
    "border border-moss-500/50 text-moss-300 hover:bg-moss-500/10 hover:border-moss-400",
  ghost: "text-mist-200 hover:text-moss-300",
  dark: "bg-ink-800 text-mist-200 hover:bg-ink-700 border border-white/5",
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
        className={`inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold tracking-wide transition-all duration-200 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
