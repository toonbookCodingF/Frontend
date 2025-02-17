import React from "react";

export function Card({ children, className }: any) {
  return <div className={`p-4 rounded-lg ${className}`}>{children}</div>;
}

export function CardHeader({ children }: any) {
  return <div className="mb-2">{children}</div>;
}

export function CardContent({ children }: any) {
  return <div>{children}</div>;
}

export function CardTitle({ children }: any) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}


