import React from "react";

export default function Select({ name, options, error, onChange, ...rest }) {
  return (
    <div>
      <select name={name} id={name} onChange={onChange} {...rest}>
        <option value="" aria-selected>
          No contact selected
        </option>
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
