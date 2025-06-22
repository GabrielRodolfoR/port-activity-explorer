import React from "react";
import "../styles/DateFilter.css";

export default function DateFilter({ startDate, endDate, onStartDateChange, onEndDateChange }) {
    return (
        <div className="date-filter">
            <label>
                De:
                <input type="date" value={startDate} onChange={onStartDateChange} />
            </label>
            <label>
                Até:
                <input type="date" value={endDate} onChange={onEndDateChange} />
            </label>
        </div>
    )
}