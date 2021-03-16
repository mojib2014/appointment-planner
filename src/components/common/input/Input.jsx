import React from "react";

export default function Input({
  name,
  value,
  type,
  onChange,
  error,
  placeholder,
  min,
  ...rest
}) {
  return (
    <div className="form-group">
      <input
        {...rest}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
