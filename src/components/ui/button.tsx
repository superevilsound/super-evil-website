import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "rounded-full bg-[var(--color-panel)] px-5 py-2.5 text-[var(--color-surface)] shadow-[0_2px_0_rgba(11,11,9,0.25)] hover:opacity-90 active:translate-y-px active:shadow-[0_1px_0_rgba(11,11,9,0.25)]",
        outline:
          "rounded-full border border-dashed border-[var(--color-ink)] bg-[var(--color-surface)] px-5 py-2.5 text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]",
        ghost:
          "rounded-full px-4 py-2 text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)]",
        link: "p-0 h-auto normal-case tracking-normal font-sans text-[var(--color-accent)] underline-offset-4 hover:underline",
        accent:
          "rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-[var(--color-surface)] shadow-[0_3px_0_var(--color-accent-hover),0_0_16px_rgba(240,90,40,0.25)] hover:bg-[var(--color-accent-hover)] active:translate-y-px active:shadow-[0_2px_0_var(--color-accent-hover)]",
      },
      size: {
        sm: "h-9 px-4 text-[0.65rem]",
        md: "h-10 px-5",
        lg: "h-11 px-6 text-xs",
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

type BadgeVariant = "default" | "preorder" | "soldout" | "instock";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-[var(--color-panel)] text-[var(--color-surface)]",
    preorder: "bg-[var(--color-accent)] text-[var(--color-surface)]",
    soldout: "bg-[var(--color-warning)] text-[var(--color-surface)]",
    instock: "bg-[var(--color-panel)] text-[var(--color-led)] border border-[var(--color-led)]/40",
  };

  return (
    <span
      className={cn(
        "label-mono inline-flex items-center rounded-full px-2.5 py-0.5",
        variants[variant],
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
    <div className="mb-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="section-eyebrow-editorial label-mono mb-2 text-[var(--color-subtle)]">
              {eyebrow}
            </p>
          )}
          <h2 className="section-title text-[var(--color-ink)]">{title}</h2>
        </div>
        {action}
      </div>
      <div className="divider-dashed mt-4" aria-hidden />
    </div>
  );
}
