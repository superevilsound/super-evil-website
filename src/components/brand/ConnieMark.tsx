import Image from "next/image";
import { cn } from "@/lib/utils";

type ConnieVariant = "watermark-dark" | "sticker-light" | "hero" | "boot";

const config: Record<
  ConnieVariant,
  { src: string; alt: string; sizes: string }
> = {
  "watermark-dark": {
    src: "/super-evil-mascot.svg",
    alt: "",
    sizes: "480px",
  },
  "sticker-light": {
    src: "/connie-black.svg",
    alt: "",
    sizes: "200px",
  },
  hero: {
    src: "/super-evil-mascot.svg",
    alt: "Connie",
    sizes: "(max-width:768px) 55vw, 420px",
  },
  boot: {
    src: "/super-evil-mascot.svg",
    alt: "",
    sizes: "80px",
  },
};

export function ConnieMark({
  variant,
  className,
  priority,
}: {
  variant: ConnieVariant;
  className?: string;
  priority?: boolean;
}) {
  const { src, alt, sizes } = config[variant];
  const decorative = variant === "watermark-dark" || variant === "boot";

  return (
    <Image
      src={src}
      alt={alt}
      width={688}
      height={559}
      sizes={sizes}
      priority={priority}
      aria-hidden={decorative}
      className={cn("pointer-events-none select-none", className)}
    />
  );
}
