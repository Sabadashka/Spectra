import { useEffect, useRef, useState, type FormEvent } from "react";
import { ART_TYPES, type Artwork, type ArtworkDraft, type ArtworkErrors } from "../types";
import { MAX_TITLE_LENGTH, validateDraft } from "../utils/validation";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Artwork, "id">) => void;
}

const EMPTY: ArtworkDraft = { title: "", artist: "", type: "", price: "", available: true };

export default function AddArtworkDialog({ open, onClose, onSubmit }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<ArtworkDraft>(EMPTY);
  const [errors, setErrors] = useState<ArtworkErrors>({});

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      setDraft(EMPTY);
      setErrors({});
      dlg.showModal();
    } else if (!open && dlg.open) {
      dlg.close();
    }
  }, [open]);

  const set = <K extends keyof ArtworkDraft>(key: K, value: ArtworkDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateDraft(draft);
    setErrors(errs);
    if (Object.keys(errs).length > 0 || draft.type === "") return;
    onSubmit({
      title: draft.title.trim(),
      artist: draft.artist.trim(),
      type: draft.type,
      price: Number(draft.price),
      available: draft.available,
    });
  };

  return (
    <dialog ref={ref} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <h2>Новий твір</h2>

        <div className={`field ${errors.title ? "bad" : ""}`}>
          <label htmlFor="title">Назва</label>
          <input id="title" type="text" autoComplete="off" value={draft.title}
            onChange={(e) => set("title", e.target.value)} aria-invalid={!!errors.title} />
          <span className="hint">{draft.title.trim().length}/{MAX_TITLE_LENGTH}</span>
          {errors.title && <span className="err">{errors.title}</span>}
        </div>

        <div className={`field ${errors.artist ? "bad" : ""}`}>
          <label htmlFor="artist">Художник</label>
          <input id="artist" type="text" autoComplete="off" value={draft.artist}
            onChange={(e) => set("artist", e.target.value)} aria-invalid={!!errors.artist} />
          {errors.artist && <span className="err">{errors.artist}</span>}
        </div>

        <div className={`field ${errors.type ? "bad" : ""}`}>
          <label htmlFor="type">Тип</label>
          <select id="type" value={draft.type} onChange={(e) => set("type", e.target.value as ArtworkDraft["type"])}>
            <option value="">Оберіть тип</option>
            {ART_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.type && <span className="err">{errors.type}</span>}
        </div>

        <div className={`field ${errors.price ? "bad" : ""}`}>
          <label htmlFor="price">Ціна, $</label>
          <input id="price" type="number" step="any" inputMode="decimal" value={draft.price}
            onChange={(e) => set("price", e.target.value)} aria-invalid={!!errors.price} />
          {errors.price && <span className="err">{errors.price}</span>}
        </div>

        <label className="check">
          <input type="checkbox" checked={draft.available} onChange={(e) => set("available", e.target.checked)} />
          Доступний для продажу (інакше — лише для експозиції)
        </label>

        <div className="form-actions">
          <button type="button" className="btn ghost" onClick={onClose}>Скасувати</button>
          <button type="submit" className="btn">Додати твір</button>
        </div>
      </form>
    </dialog>
  );
}
