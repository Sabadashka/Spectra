import { useCallback, useEffect, useRef, useState } from "react";
import type { Artwork } from "./types";
import { useGallery } from "./hooks/useGallery";
import Toolbar from "./components/Toolbar";
import ArtCard from "./components/ArtCard";
import AddArtworkDialog from "./components/AddArtworkDialog";

export default function App() {
  const { items, visible, artists, types, filters, setFilters, add, remove, reset } = useGallery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(""), 2200);
  }, []);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleDelete = (a: Artwork) => {
    remove(a.id);
    notify(`Видалено: ${a.title}`);
  };

  return (
      <>
        <header className="topbar">
          <div className="wrap brand">
          <span className="logo-card" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4L3 19.5h18L12 4z" />
              <path d="M18.5 18.5L8.5 12.5" strokeWidth="1.8" />
            </svg>
          </span>
            Spectra
          </div>
        </header>

        <main>
          <div className="wrap">
            <div className="heading">
              <div>
                <h1>Досліджуйте нашу колекцію</h1>
                <p className="sub">Переглядайте, фільтруйте та керуйте творами мистецтва.</p>
              </div>
              <button className="btn" onClick={() => setDialogOpen(true)}>
                <span aria-hidden="true">+</span> Додати новий твір
              </button>
            </div>

            <Toolbar filters={filters} artists={artists} types={types}
                     onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))} />

            <p className="count" aria-live="polite">Показано {visible.length} з {items.length}</p>

            <div className="grid">
              {visible.length === 0 ? (
                  <div className="empty">
                    <p>{items.length ? "Нічого не знайдено. Змініть пошук або фільтри." : "У галереї ще немає творів."}</p>
                    <button className="btn small" onClick={() => setDialogOpen(true)}>Додати твір</button>
                  </div>
              ) : (
                  visible.map((a) => <ArtCard key={a.id} artwork={a} onDelete={handleDelete} />)
              )}
            </div>

            <div className="bottom-actions">
              <button className="btn ghost small" onClick={() => { reset(); notify("Галерею скинуто до початкового стану"); }}>
                Скинути до початкових
              </button>
            </div>
          </div>
        </main>

        <footer>
          <div className="wrap footer-in">
            <div>
              <p className="name">Spectra</p>
              <p className="tagline">Зберігаємо прекрасне, керуємо складним. Інноваційний хаб для арт-менеджменту</p>
            </div>
            <p className="copy">© 2026</p>
          </div>
        </footer>

        <AddArtworkDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSubmit={(data) => { add(data); setDialogOpen(false); notify(`Додано: ${data.title}`); }}
        />

        <div className={`toast ${toast ? "on" : ""}`} role="status">{toast}</div>
      </>
  );
}
