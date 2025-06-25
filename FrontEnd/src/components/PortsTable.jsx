import React, { useEffect, useState } from "react";
import { fetchPortsActivity, fetchPortDetails } from "../services/api";
import "../styles/PortsTable.css";
import "../styles/PortDetails.css";

export default function PortsTable({ page, pageSize, filters }) {
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPort, setSelectedPort] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDetailsClick = async (objectId) => {
    try {
      const details = await fetchPortDetails(objectId);
      setSelectedPort(details);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Erro ao buscar detalhes:", err);
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPort(null);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <>
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
                <button
                  className="details-button"
                  title="Detalhes do Porto"
                  onClick={() => {
                    handleDetailsClick(port.objectid);
                  }}
                >
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

      {isModalOpen && selectedPort && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <header className="modal-header">
              <h2>Detalhes do Porto: {selectedPort.portname}</h2>
              <button className="modal-close" onClick={closeModal} aria-label="Fechar modal">&times;</button>
            </header>

            <section className="modal-section">
              <h3>Informações Gerais</h3>
              <div className="modal-grid">
                <div><strong>ID:</strong> {selectedPort.objectid}</div>
                <div><strong>Port ID:</strong> {selectedPort.portid}</div>
                <div><strong>País:</strong> {selectedPort.country}</div>
                <div><strong>ISO3:</strong> {selectedPort.ISO3}</div>
                <div><strong>Data:</strong> {selectedPort.date?.split("-").reverse().join("/")}</div>
                <div><strong>Total Port Calls:</strong> {selectedPort.portcalls}</div>
              </div>
            </section>

            <section className="modal-section">
              <h3>Detalhes dos Port Calls</h3>
              <div className="modal-grid">
                <div><strong>Container:</strong> {selectedPort.portcalls_container}</div>
                <div><strong>Dry Bulk:</strong> {selectedPort.portcalls_dry_bulk}</div>
                <div><strong>General Cargo:</strong> {selectedPort.portcalls_general_cargo}</div>
                <div><strong>RORO:</strong> {selectedPort.portcalls_roro}</div>
                <div><strong>Tanker:</strong> {selectedPort.portcalls_tanker}</div>
                <div><strong>Total Cargo:</strong> {selectedPort.portcalls_cargo}</div>
              </div>
            </section>

            <section className="modal-section">
              <h3>Importações</h3>
              <div className="modal-grid">
                <div><strong>Container:</strong> {selectedPort.import_container.toFixed(2)}</div>
                <div><strong>Dry Bulk:</strong> {selectedPort.import_dry_bulk.toFixed(2)}</div>
                <div><strong>General Cargo:</strong> {selectedPort.import_general_cargo.toFixed(2)}</div>
                <div><strong>RORO:</strong> {selectedPort.import_roro.toFixed(2)}</div>
                <div><strong>Tanker:</strong> {selectedPort.import_tanker.toFixed(2)}</div>
                <div><strong>Total Cargo:</strong> {selectedPort.import_cargo.toFixed(2)}</div>
                <div><strong>Total Geral:</strong> {selectedPort.import_total.toFixed(2)}</div>
              </div>
            </section>

            <section className="modal-section">
              <h3>Exportações</h3>
              <div className="modal-grid">
                <div><strong>Container:</strong> {selectedPort.export_container.toFixed(2)}</div>
                <div><strong>Dry Bulk:</strong> {selectedPort.export_dry_bulk.toFixed(2)}</div>
                <div><strong>General Cargo:</strong> {selectedPort.export_general_cargo.toFixed(2)}</div>
                <div><strong>RORO:</strong> {selectedPort.export_roro.toFixed(2)}</div>
                <div><strong>Tanker:</strong> {selectedPort.export_tanker.toFixed(2)}</div>
                <div><strong>Total Cargo:</strong> {selectedPort.export_cargo.toFixed(2)}</div>
                <div><strong>Total Geral:</strong> {selectedPort.export_total.toFixed(2)}</div>
              </div>
            </section>
          </div>
        </div>

      )}


    </>
  );
}