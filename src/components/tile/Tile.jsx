import React from "react";

export default function Tile({ item }) {
  const itemArray = Object.values(item);
  return (
    <div className="tile-container">
      {itemArray.map((value, index) => (
        <p key={index} className={index === 0 ? "tile-title" : "tile"}>
          {value}
        </p>
      ))}
    </div>
  );
}
