import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "../styles/SearchBar.css"

export default function SearchBar({ field, onFieldChange, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  function fetchResults(term, selectedField) {
    setLoading(true);
    axios
      .get("http://localhost:8000/autocomplete", {
        params: { term, field: selectedField },
      })
      .then((res) => setResults(res.data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 1) {
        fetchResults(query, field);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, field]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(value) {
    setQuery(value);
    setResults([]);
    setHighlightedIndex(-1);
    if (onSelect) onSelect(value);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelect(results[highlightedIndex]);
      } else if (query.trim()) {
        handleSelect(query.trim());
      }
    }
  }

  return (
    <div className="search-bar-with-filter" ref={wrapperRef}>
      <select
        className="search-filter-select"
        value={field}
        onChange={(e) => {
          onFieldChange(e.target.value);
          setQuery(""); // opcional: limpa a busca ao trocar campo
        }}
      >
        <option value="portname">Porto</option>
        <option value="country">País</option>
      </select>

      <div className="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="var(--primary-color)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setHighlightedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (query.length >= 1) {
            fetchResults(query, field);
          }
        }}
        placeholder={`Buscar por ${field === "portname" ? "Nome do Porto" : "País"}`}
        aria-label="Buscar"
        className={results.length > 0 || loading ? "open" : ""}
      />

      {loading && <div className="loading">Carregando...</div>}

      {results.length > 0 && (
        <ul className="autocomplete-results">
          {results.map((item, idx) => (
            <li
              key={idx}
              className={idx === highlightedIndex ? "highlighted" : ""}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
