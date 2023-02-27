import React from "react";

function Tile({ c, i, j, handleClick, handleRightClick }) {
  return (() => {
    if (c === "0") {
      return <div id={`${i},${j}`} onClick={handleClick} className="type0 tile"></div>;
    } else if (c === "1") {
      return <div id={`${i},${j}`} className="type1 tile"></div>;
    } else if (c === "2") {
      return <div id={`${i},${j}`} className="type2 tile"></div>;
    } else if (c === "3") {
      return <div id={`${i},${j}`} className="type3 tile"></div>;
    } else if (c === "4") {
      return <div id={`${i},${j}`} className="type4 tile"></div>;
    } else if (c === "f") {
      return <div id={`${i},${j}`} onContextMenu={handleRightClick} className="flag tile"></div>;
    } else if (c === "b") {
      return <div id={`${i},${j}`} className="mine tile"></div>;
    } else if (c === "mr") {
      return <div id={`${i},${j}`} className="mine_red tile"></div>;
    } else if (c === "mw") {
      return <div id={`${i},${j}`} className="mine_wrong tile"></div>;
    } else if (c === "") {
      return (
        <div id={`${i},${j}`} onClick={handleClick} onContextMenu={handleRightClick} className="closed tile"></div>
      );
    }
  })();
}

export default Tile;
