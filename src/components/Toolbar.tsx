import type { Filters } from "../hooks/useGallery";
import type { SortOrder } from "../types";

interface Props {
    filters: Filters;
    artists: string[];
    types: string[];
    onChange: (patch: Partial<Filters>) => void;
}

export default function Toolbar({ filters, artists, types, onChange }: Props) {
    return (
        <div className="toolbar">
            <label className="search">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
                <input type="search" placeholder="Пошук за назвою" aria-label="Пошук за назвою"
                       value={filters.query} onChange={(e) => onChange({ query: e.target.value })} />
            </label>

            <select aria-label="Фільтр за художником" value={filters.artist}
                    onChange={(e) => onChange({ artist: e.target.value })}>
                <option value="">Усі художники</option>
                {artists.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>

            <select aria-label="Фільтр за типом" value={filters.type}
                    onChange={(e) => onChange({ type: e.target.value })}>
                <option value="">Усі типи</option>
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            <select aria-label="Сортування за ціною" value={filters.sort}
                    onChange={(e) => onChange({ sort: e.target.value as SortOrder })}>
                <option value="">Сортувати за</option>
                <option value="asc">Ціна: від найменшої</option>
                <option value="desc">Ціна: від найбільшої</option>
            </select>
        </div>
    );
}
