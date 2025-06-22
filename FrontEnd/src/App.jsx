// src/App.jsx
import './styles/index.css';
import "./styles/PaginationControls.css";
import Header from './components/Header';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import PortsTable from './components/PortsTable';
import DateFilter from './components/DateFilter';

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSeatchChange = (e) => {
    setSearchTerm(e.target.value);
  }


  return (
    <>
      <Header />
      <div className="container">
        <h2 className="title">Bem-vindo ao Sistema!</h2>

        <div className="top-filters">
          <SearchBar value={searchTerm} onChange={handleSeatchChange} />
          <DateFilter />
        </div>

        <div className="pagination-controls">
          <div className="pagination-center">
            <div className="pagination-group">
              <button>{'<<'}</button>
              <button>{'<'}</button>
              <span className="page-info">Página 1 de 33000</span>
              <button>{'>'}</button>
              <button>{'>>'}</button>
            </div>
          </div>

          <div className="pagination-group items-per-page-group">
            <label htmlFor="itemsPerPage">Itens por página:</label>
            <select id="itemsPerPage">
              <option value="25">25</option>
              <option value="50" selected>50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
        </div>

        <PortsTable />
      </div >
    </>
  );
}
