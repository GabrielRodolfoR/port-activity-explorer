import React from "react";
import "../styles/PortsTable.css";

export default function PortsTable({ data }) {
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
                <tr>
                    <td data-label="Código">1</td>
                    <td data-label="Porto">Porto</td>
                    <td data-label="Data">Data</td>
                    <td data-label="Nome do Porto">Teste</td>
                    <td data-label="País">Teste</td>
                    <td data-label="ISO3">Teste</td>
                    <td data-label="Detalhes">Detalhes</td>
                </tr>
            </tbody>
        </table>
    )
}