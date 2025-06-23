import React, { useEffect, useState } from "react";
import { fetchPortsActivity } from "../services/api";
import "../styles/PortsTable.css";

export default function PortsTable({ page, pageSize, filters }) {
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPortsActivity(page, pageSize, filters)
      .then(data => {
        setPorts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [page, pageSize, filters]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <table className="ports-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Porto</th>
          <th>Data</th>
          <th>Nome do Porto</th>
          <th>País</th>
          <th>ISO3</th>
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {ports.map((port) => (
          <tr key={port.objectid}>
            <td data-label="Código">{port.objectid}</td>
            <td data-label="Porto">{port.portid}</td>
            <td data-label="Data">{port.date?.substring(0, 10).split("-").reverse().join("/")}</td>
            <td data-label="Nome do Porto">{port.portname}</td>
            <td data-label="País">{port.country}</td>
            <td data-label="ISO3">{port.ISO3}</td>
            <td data-label="Detalhes">
              <button className="details-button" title="Detalhes do Porto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--primary-color)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-eye"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}