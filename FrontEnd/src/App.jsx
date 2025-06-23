import './styles/index.css';
import "./styles/PaginationControls.css";
import Header from './components/Header';
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import PortsTable from './components/PortsTable';
import DateFilter from './components/DateFilter';
import { fetchPortActivityCount } from './services/api';

export default function App() {
  const [searchField, setSearchField] = useState("country");
  const [filters, setFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalItems, setTotalItems] = useState(3486153);

  const handleItemsPerPageChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    async function updateTotalCount() {
      try {
        const total = await fetchPortActivityCount(filters || {});
        setTotalItems(total);
        const totalPages = Math.ceil(total / pageSize);
        if (page > totalPages) setPage(totalPages || 1);
      } catch (error) {
        console.error("Erro ao buscar total de itens:", error);
      }
    }

    updateTotalCount();
  }, [filters, pageSize]);

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="title">Bem-vindo ao Sistema!</h2>

        <div className="top-filters">
          <SearchBar
            field={searchField}
            onFieldChange={(newField) => {
              setSearchField(newField);
              setFilter(null);
              setPage(1);
            }}
            onSelect={(value) => {
              setFilter({ [searchField]: value });
              setPage(1);
            }}
          />
          <DateFilter />
        </div>

        <div className="pagination-controls">
          <div className="pagination-center">
            <div className="pagination-group">
              <button onClick={() => setPage(1)} disabled={page === 1}>{"<<"}</button>
              <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>{"<"}</button>

              <span className="page-info">
                Página
                <input
                  type="number"
                  className="page-input"
                  value={page}
                  min="1"
                  max={totalPages}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      setPage(value > totalPages ? totalPages : value < 1 ? 1 : value);
                    }
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) setPage(1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.target.blur();
                  }}
                />
                de {totalPages}
              </span>
              <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>{">"}</button>
              <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>{">>"}</button>
            </div>
          </div>

          <div className="pagination-group items-per-page-group">
            <label htmlFor="itemsPerPage">Itens por página:</label>
            <select id="itemsPerPage" value={pageSize} onChange={handleItemsPerPageChange}>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>

        <PortsTable page={page} pageSize={pageSize} filters={filters} />

        <div className="pagination-center">
          <div className="pagination-group">
            <button onClick={() => setPage(1)} disabled={page === 1}>{"<<"}</button>
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>{"<"}</button>
            <span className="page-info">Página {page} de {totalPages}</span>
            <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>{">"}</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>{">>"}</button>
          </div>
        </div>
      </div>
    </>
  );
}
