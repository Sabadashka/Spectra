export const ART_TYPES = [
  "Живопис",
  "Скульптура",
  "Графіка",
  "Фотографія",
  "Цифрове мистецтво",
] as const;

export type ArtType = (typeof ART_TYPES)[number];

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  type: ArtType;
  price: number;
  available: boolean;
}

export type SortOrder = "" | "asc" | "desc";

export interface ArtworkDraft {
  title: string;
  artist: string;
  type: ArtType | "";
  price: string;
  available: boolean;
}

export type ArtworkErrors = Partial<Record<"title" | "artist" | "type" | "price", string>>;
