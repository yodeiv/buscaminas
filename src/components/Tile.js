import React from "react";

function Tile({ cij, handleClick, handleRightClick }) {
  const { c, i, j } = cij;
  const n = ((c) => {
    //for numbers from 1 to 8
    return isNaN(parseInt(c)) ? c : parseInt(c);
  })(c);

  return (() => {
    if (n === 0) {
      return <div id={`${i},${j}`} onClick={handleClick} className="type0 tile"></div>;
    } else if (n >= 1) {
      return <div id={`${i},${j}`} className={`type${c} tile`}></div>;
    } else if (n === "f") {
      return <div id={`${i},${j}`} onContextMenu={handleRightClick} className="flag tile"></div>;
    } else if (n === "b") {
      return <div id={`${i},${j}`} className="mine tile"></div>;
    } else if (n === "mr") {
      return <div id={`${i},${j}`} className="mine_red tile"></div>;
    } else if (n === "mw") {
      return <div id={`${i},${j}`} className="mine_wrong tile"></div>;
    } else if (n === "") {
      return (
        <div id={`${i},${j}`} onClick={handleClick} onContextMenu={handleRightClick} className="closed tile"></div>
      );
    }
  })();
}

export default Tile;
