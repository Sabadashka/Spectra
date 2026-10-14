import type { ArtworkDraft, ArtworkErrors } from "../types";

export const MAX_TITLE_LENGTH = 99;

export function validateDraft(d: ArtworkDraft): ArtworkErrors {
  const errors: ArtworkErrors = {};
  const title = d.title.trim();
  const price = Number(d.price);

  if (!title) errors.title = "Введіть назву";
  else if (title.length > MAX_TITLE_LENGTH) errors.title = `Назва може містити щонайбільше ${MAX_TITLE_LENGTH} символів`;

  if (!d.artist.trim()) errors.artist = "Вкажіть художника";

  if (!d.type) errors.type = "Оберіть тип зі списку";

  if (d.price.trim() === "" || !Number.isFinite(price)) errors.price = "Введіть ціну числом";
  else if (price <= 0) errors.price = "Ціна має бути більшою за нуль";

  return errors;
}
