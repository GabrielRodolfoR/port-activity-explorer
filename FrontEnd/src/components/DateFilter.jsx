import React from "react";
import "../styles/DateFilter.css";

export default function DateFilter({ startDate, endDate, onStartDateChange, onEndDateChange }) {
    const minDate = "2019-01-01";
    const maxDate = "2024-10-27";

    function validateDate(value) {
        if (!value) return "";
        if (value < minDate) return minDate;
        if (value > maxDate) return maxDate;
        return value;
    }

    function handleStartDateChange(e) {
        const validDate = validateDate(e.target.value);
        onStartDateChange({ target: { value: validDate } });
    }

    function handleEndDateChange(e) {
        const validDate = validateDate(e.target.value);
        onEndDateChange({ target: { value: validDate } });
    }

    return (
        <div className="date-filter">
            <label>
                De:
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={minDate}
                    max={maxDate}
                />
            </label>
            <label>
                Até:
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={minDate}
                    max={maxDate}
                />
            </label>
        </div>
    );
}
