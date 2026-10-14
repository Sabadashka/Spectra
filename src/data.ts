import type { Artwork } from "./types";

/** Перші 4 твори, які показуються при запуску. */
export const INITIAL_ARTWORKS: Artwork[] = [
  { id: 1, title: "Карпатський перевал", artist: "Остап Гаврилюк", type: "Живопис", price: 5500, available: true },
  { id: 2, title: "Ранок на озері", artist: "Олена Волошина", type: "Живопис", price: 3500, available: true },
  { id: 3, title: "Київський ритм", artist: "Софія Левченко", type: "Графіка", price: 2100, available: false },
  { id: 4, title: "Скіфська спадщина", artist: "Михайло Гончар", type: "Скульптура", price: 8900, available: true },
];
