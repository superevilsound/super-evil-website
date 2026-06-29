import type { ProductType } from "@/lib/types";

/** Visual-only store labels — does not affect product types or cart logic. */
export function storeCategoryLabel(id: ProductType | "all") {
  switch (id) {
    case "all":
      return "Everything";
    case "pedal":
      return "Machines";
    case "sample_pack":
      return "Sounds";
    case "merch":
      return "Uniforms";
  }
}

export function storeProductTypeLabel(type: ProductType) {
  switch (type) {
    case "pedal":
      return "Machine";
    case "sample_pack":
      return "Sounds";
    case "merch":
      return "Uniform";
  }
}
