import type { MaterialPalette } from "@/data/types";

export interface RenderOptions {
  /** Stable seed — normally the metal id. The same seed always renders alike. */
  seed?: string;
  /** 0.35 for thumbnails, 1 for the full panel. */
  quality?: number;
}

export declare function renderMaterialField(
  canvas: HTMLCanvasElement,
  palette: MaterialPalette,
  opts?: RenderOptions
): void;
