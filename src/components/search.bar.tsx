'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@heroui/react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  width?: number | string;
  height?: number | string;
}

const SearchIcon = ({ size = 24, strokeWidth = 1.5, width, height, ...props }: IconProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

interface ISearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
}

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Закриваємо випадаючий список, якщо клікнули поза пошуком
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Підхоплюємо запит з адресного рядка, коли потрапляємо на сторінку результатів
  useEffect(() => {
    if (pathname === '/search') {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get('q') ?? '');
    }
  }, [pathname]);

  // Пошук із затримкою, щоб не дьоргати TMDB на кожну літеру
  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        setResults(data.results ?? []);
        setIsOpen(true);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Search request failed:', error);
        }
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  const goToSearchPage = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSelect = (id: number, mediaType: 'movie' | 'tv') => {
    setIsOpen(false);
    router.push(`/content/${id}?type=${mediaType}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      goToSearchPage();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <Input
        classNames={{
          base: "max-w-32 sm:max-w-36 lg:max-w-[10rem] h-10",
          mainWrapper: "h-full ",
          input: "text-small",
          inputWrapper:
            "rounded-lg bg-pink-100 hover:bg-pink-100 h-full font-normal text-default-500 border-2 border-pink-300",
        }}
        placeholder="Пошук фільмів і серіалів..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
      />

      {isOpen && query.trim() && (
        <div className="absolute right-0 top-full mt-2 z-50 w-72 max-w-[90vw] rounded-xl bg-white shadow-xl border border-pink-100 overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-sm text-gray-500">Шукаємо...</div>
          ) : results.length > 0 ? (
            <>
              <ul className="max-h-96 overflow-y-auto">
                {results.map((movie) => (
                  <li
                    key={`search-result-${movie.id}`}
                    onClick={() => handleSelect(movie.id, movie.media_type)}
                    className="flex gap-3 items-center p-2 cursor-pointer hover:bg-pink-50 transition-colors"
                  >
                    <div className="relative w-10 h-14 shrink-0 overflow-hidden rounded-md bg-gray-200">
                      {movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title ?? movie.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium text-gray-900 line-clamp-1 block">
                        {movie.title ?? movie.name}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        {movie.media_type === 'tv' ? 'Серіал' : 'Фільм'} · {(movie.release_date ?? movie.first_air_date)?.slice(0, 4) || '—'} · ⭐ {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={goToSearchPage}
                className="w-full p-2 text-sm font-medium text-pink-600 hover:bg-pink-50 border-t border-pink-100 transition-colors"
              >
                Усі результати за запитом «{query.trim()}»
              </button>
            </>
          ) : (
            <div className="p-4 text-sm text-gray-500">Нічого не знайдено</div>
          )}
        </div>
      )}
    </div>
  );
}
