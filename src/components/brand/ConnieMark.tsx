import Image from "next/image";
import {
  CONNIE_BLACK,
  CONNIE_DIMENSIONS,
  CONNIE_WHITE,
} from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type ConnieVariant = "watermark-dark" | "sticker-light" | "boot";

const config: Record<
  ConnieVariant,
  { src: typeof CONNIE_WHITE | typeof CONNIE_BLACK; alt: string; sizes: string }
> = {
  "watermark-dark": {
    src: CONNIE_WHITE,
    alt: "",
    sizes: "480px",
  },
  "sticker-light": {
    src: CONNIE_BLACK,
    alt: "",
    sizes: "200px",
  },
  boot: {
    src: CONNIE_WHITE,
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
      width={CONNIE_DIMENSIONS.width}
      height={CONNIE_DIMENSIONS.height}
      sizes={sizes}
      priority={priority}
      aria-hidden={decorative}
      className={cn("pointer-events-none select-none", className)}
    />
  );
}
