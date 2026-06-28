import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-[var(--color-ink)] text-white hover:opacity-90",
        outline:
          "border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]",
        ghost: "text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]",
        link: "text-[var(--color-ink)] underline-offset-4 hover:underline p-0 h-auto",
        accent: "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-6",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

export function Button({
  className,
  variant,
  size,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[var(--color-ink)] px-2 py-0.5 text-xs font-medium text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[var(--color-subtle)]">
            {eyebrow}
          </p>
        )}
        <h2 className="section-title">{title}</h2>
      </div>
      {action}
    </div>
  );
}
