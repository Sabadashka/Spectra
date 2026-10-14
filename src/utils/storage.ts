import { ART_TYPES, type Artwork } from "../types";
import { INITIAL_ARTWORKS } from "../data";

const STORAGE_KEY = "artGallery.artworks";

function isArtwork(v: unknown): v is Artwork {
  if (typeof v !== "object" || v === null) return false;
  const a = v as Record<string, unknown>;
  return (
    typeof a.id === "number" &&
    typeof a.title === "string" &&
    typeof a.artist === "string" &&
    typeof a.price === "number" &&
    typeof a.available === "boolean" &&
    (ART_TYPES as readonly unknown[]).includes(a.type)
  );
}

export function loadArtworks(): Artwork[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every(isArtwork)) return parsed;
    }
  } catch {

  }
  return INITIAL_ARTWORKS.map((a) => ({ ...a }));
}

export function saveArtworks(items: Artwork[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {

  }
}
