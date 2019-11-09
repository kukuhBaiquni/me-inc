import React from "react";
import Header from "./layout/Header";

export function NotFound() {
  return (
    <div>
      <Header />
      <h1>404 Not Found</h1>
    </div>
  );
}

export function NotAuthroized() {
  return (
    <div>
      <Header />
      <h1>Access denied - You are not authorized to access this page</h1>
    </div>
  );
}
