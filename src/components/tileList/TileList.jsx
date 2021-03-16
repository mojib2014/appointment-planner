import React from "react";
import Tile from "../tile/Tile";

export default function TileList({ items }) {
  return (
    <>
      {items.map((item, index) => (
        <Tile key={index} item={item} />
      ))}
    </>
  );
}
