import React from "react";

export function Input({ type, placeholder, value, onChange, className }: any) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`borderRadius rounded-md p-2 w-full ${className}`}
    />
  );
}
