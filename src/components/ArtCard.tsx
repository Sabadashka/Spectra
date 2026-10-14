import type { Artwork } from "../types";
import { formatPrice } from "../utils/format";
import ArtworkImage from "./ArtworkImage";

interface Props {
  artwork: Artwork;
  onDelete: (artwork: Artwork) => void;
}

export default function ArtCard({ artwork, onDelete }: Props) {
  const status = artwork.available ? "sale" : "show";
  return (
      <article className={`card ${status}`}>
        <div className="thumb">
          <ArtworkImage artwork={artwork} />
          <span className={`badge ${status}`}>
          <i className="dot" aria-hidden="true" />
            {artwork.available ? "Доступний для продажу" : "Лише експозиція"}
        </span>
          <button className="del" onClick={() => onDelete(artwork)} aria-label={`Видалити твір ${artwork.title}`} title="Видалити">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="card-body">
          <div className="row">
            <h3 className="title">{artwork.title}</h3>
            <span className="price">{formatPrice(artwork.price)}</span>
          </div>
          <p className="by">Автор: {artwork.artist}</p>
          <span className="chip">{artwork.type}</span>
        </div>
      </article>
  );
}
