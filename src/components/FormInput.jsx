import React from "react";

function FormInput({ type, name, label, className, onChange }) {
  return (
    <label className="form-control w-full max-w-md">
      <div className="label">
        <span className="label-text capitalize">{label}</span>
      </div>
      <input
        type={type}
        placeholder="Type here"
        className={`input input-bordered w-full ${className}`}
        name={name}
        onChange={onChange}
      />
    </label>
  );
}

export default FormInput;
