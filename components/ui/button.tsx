import React from "react";

export function Button({ children, className, ...props }: any) {
  return (
    <button className={`bg-blue-500 text-white p-2 rounded-md w-full ${className}`} {...props}>
      {children}
    </button>
  );
}
