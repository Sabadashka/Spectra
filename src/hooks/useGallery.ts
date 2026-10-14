import { useCallback, useEffect, useMemo, useState } from "react";
import type { Artwork, SortOrder } from "../types";
import { INITIAL_ARTWORKS } from "../data";
import { loadArtworks, saveArtworks } from "../utils/storage";

export interface Filters {
  query: string;
  artist: string;
  type: string;
  sort: SortOrder;
}

export function useGallery() {
  const [items, setItems] = useState<Artwork[]>(loadArtworks);
  const [filters, setFilters] = useState<Filters>({ query: "", artist: "", type: "", sort: "" });

  useEffect(() => saveArtworks(items), [items]);

  const add = useCallback((data: Omit<Artwork, "id">) => {
    setItems((prev) => {
      const id = prev.reduce((m, a) => Math.max(m, a.id), 0) + 1;
      return [...prev, { id, ...data }];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const reset = useCallback(() => setItems(INITIAL_ARTWORKS.map((a) => ({ ...a }))), []);

  const artists = useMemo(
    () => Array.from(new Set(items.map((a) => a.artist))).sort((a, b) => a.localeCompare(b, "uk")),
    [items],
  );
  const types = useMemo(
      () => Array.from(new Set(items.map((a) => a.type))), [items]
  );

  const visible = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const list = items.filter(
      (a) =>
        (!filters.artist || a.artist === filters.artist) &&
        (!filters.type || a.type === filters.type) &&
        (!q || a.title.toLowerCase().includes(q)),
    );
    if (filters.sort === "asc") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [items, filters]);

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      artist: f.artist && !artists.includes(f.artist) ? "" : f.artist,
      type: f.type && !types.some((t) => t === f.type) ? "" : f.type,
    }));
  }, [artists, types]);

  return { items, visible, artists, types, filters, setFilters, add, remove, reset };
}
