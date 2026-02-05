import React from "react";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <div className="page-container">
      <h1>Category: {category}</h1>
      <p>Articles related to {category} will appear here.</p>
    </div>
  );
}
