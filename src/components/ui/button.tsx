import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "text-[16px] font-medium cursor-pointer",
    "transition-[transform,background-color,border-color,box-shadow,opacity] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6BB6FF]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "group bg-white text-black hover:bg-white/92 hover:shadow-[0_12px_36px_rgba(255,255,255,0.2)] hover:-translate-y-0.5",
        secondary:
          "border border-white/20 bg-white/[0.04] text-white backdrop-blur-md hover:border-white/35 hover:bg-white/[0.09] hover:-translate-y-0.5",
        ghost: "text-white hover:text-white/80",
      },
      size: {
        default: "min-h-[44px] h-[48px] px-6 text-[16px]",
        sm: "min-h-[44px] h-[44px] px-5 text-[15px]",
        nav: "min-h-[40px] h-[40px] px-4 text-[15px] lg:text-[16px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { className, variant, size, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      aria-label={buttonProps["aria-label"]}
    >
      {children}
    </button>
  );
}
