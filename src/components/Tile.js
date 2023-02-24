import React from "react";

function Tile({ c, i, j, handleClick, handleRightClick }) {
  return (() => {
    if (c === "0") {
      return <div id={`${i},${j}`} onClick={handleClick} className="type0"></div>;
    } else if (c === "1") {
      return <div id={`${i},${j}`} className="type1"></div>;
    } else if (c === "2") {
      return <div id={`${i},${j}`} className="type2"></div>;
    } else if (c === "3") {
      return <div id={`${i},${j}`} className="type3"></div>;
    } else if (c === "4") {
      return <div id={`${i},${j}`} className="type4"></div>;
    } else if (c === "f") {
      return <div id={`${i},${j}`} onContextMenu={handleRightClick} className="flag"></div>;
    } else if (c === "b") {
      return <div id={`${i},${j}`} className="mine"></div>;
    } else if (c === "mr") {
      return <div id={`${i},${j}`} className="mine_red"></div>;
    } else if (c === "mw") {
      return <div id={`${i},${j}`} className="mine_wrong"></div>;
    } else if (c === "") {
      return <div id={`${i},${j}`} onClick={handleClick} onContextMenu={handleRightClick} className="closed"></div>;
    }
  })();
}

export default Tile;
