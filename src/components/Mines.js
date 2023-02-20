import React, { useState, useRef } from "react";
//import { minesArr, otherf, a } from "./utils";
import matrix from "./utils2";
let counter = new Set();
function Mines() {
  const [mines, setMines] = useState(
    Array.from(Array(9), () => {
      return new Array(9).fill("");
    })
  );
  const [obj, setObj] = useState(matrix(9));
  //const obj = matrix(9);
  const [cover, setCover] = useState("0px");
  const [win, setWin] = useState(false);
  let minesArr = obj.applyValues;
  //const minesArr = applyValues();
  const handleRightClick = (e) => {
    let v = e.target.id.split(",").map((z) => parseInt(z));
    if (e.target.innerText === "") {
      setMines((prev) => {
        prev[v[0]][v[1]] = "f";
        return [...prev];
      });
    } else {
      setMines((prev) => {
        prev[v[0]][v[1]] = "";
        return [...prev];
      });
    }
  };
  const handleClick = (e) => {
    let v = e.target.id.split(",").map((z) => parseInt(z));

    if (minesArr[v[0]][v[1]] === 0) {
      let allCoor = [];
      let initial = [{ i: v[0], j: v[1] }];
      //otherf({ initial, allCoor });
      let t = obj.otherf({ initial, allCoor }).allCoor;
      //counter = counter + t.length;
      t.map((item) => `${item.i},${item.j}`).forEach(counter.add, counter);
      if (counter.size >= 71) setWin(true);
      setMines((prev) => {
        t.map((item) => {
          prev[item.i][item.j] = minesArr[item.i][item.j].toString();
        });
        return [...prev];
      });
    } else if (minesArr[v[0]][v[1]] >= 1) {
      setMines((prev) => {
        prev[v[0]][v[1]] = minesArr[v[0]][v[1]].toString();
        return [...prev];
      });
      counter.add(`${v[0]},${v[1]}`);
      if (counter.size >= 71) setWin(true);
    } else {
      setCover("225px");
      setMines((prev) => {
        obj.coordinatesBombs.map((item) => {
          prev[item.i][item.j] = "b";
        });
        return [...prev];
      });
    }
  };
  return (
    <div>
      <div>
        {minesArr.map((_, i) => {
          return (
            <div>
              {_.map((_, j) => {
                return (
                  <button id={`${i},${j}`} onClick={handleClick}>
                    {_}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          setObj(matrix(9));
          setMines(
            Array.from(Array(9), () => {
              return new Array(9).fill("");
            })
          );
          setCover("0px");
          setWin(false);
        }}
      >
        Change {win ? "you win" : null}
      </button>

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "inline-block",
            width: cover,
            height: cover,
            backgroundColor: "green",
            position: "absolute",
            left: "70px",
            opacity: "0.5",
          }}
        ></div>
        {mines.map((_, i) => {
          return (
            <div>
              {_.map((c, j) => {
                if (c === "0") {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "red",
                        border: "1px solid",
                      }}
                      id={`${i},${j}`}
                      onClick={handleClick}
                    ></div>
                  );
                } else if (c === "1") {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "orange",
                        border: "1px solid",
                      }}
                      id={`${i},${j}`}
                    >
                      {c}
                    </div>
                  );
                } else if (c === "2") {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "orange",
                        border: "1px solid",
                      }}
                      id={`${i},${j}`}
                    >
                      {c}
                    </div>
                  );
                } else if (c === "3") {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "orange",
                        border: "1px solid",
                      }}
                      id={`${i},${j}`}
                    >
                      {c}
                    </div>
                  );
                } else if (c === "4") {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "orange",
                        border: "1px solid",
                      }}
                      id={`${i},${j}`}
                    >
                      {c}
                    </div>
                  );
                } else if (c === "f") {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "orange",
                        border: "1px solid",
                      }}
                      id={`${i},${j}`}
                      onContextMenu={handleRightClick}
                    >
                      {c}
                    </div>
                  );
                } else if (c === "b") {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "orange",
                        border: "1px solid",
                      }}
                      id={`${i},${j}`}
                    >
                      {c}
                    </div>
                  );
                } else if (c === "") {
                  return (
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        border: "1px solid",
                      }}
                      id={`${i},${j}`}
                      onClick={handleClick}
                      onContextMenu={handleRightClick}
                    >
                      {c}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Mines;
