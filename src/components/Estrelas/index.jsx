import { useState } from "react";
import "./style.css";

export default function Estrelas() {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="estrelas">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`estrela ${hoverIndex !== null && index <= hoverIndex ? "ativa" : ""}`}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
