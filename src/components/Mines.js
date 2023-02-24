import React, { useState, useRef } from "react";
import Tile from "./Tile";
import matrix from "./utils2";

function Mines() {
  const counter = useRef(new Set());
  const [mines, setMines] = useState(
    Array.from(Array(9), () => {
      return new Array(9).fill("");
    })
  );

  const obj = useRef(matrix(9));
  const [cover, setCover] = useState("0px");
  const [win, setWin] = useState(2);
  const [countFlags, setCountFlags] = useState(new Set());

  const handleRightClick = (e) => {
    const v = e.target.id.split(",").map((z) => parseInt(z));
    if (e.target.className === "closed") {
      setMines((prev) => {
        prev[v[0]][v[1]] = "f";
        return [...prev];
      });
      setCountFlags((prev) => {
        prev.add(e.target.id);
        return prev;
      });
    } else {
      setMines((prev) => {
        prev[v[0]][v[1]] = "";
        return [...prev];
      });
      setCountFlags((prev) => {
        prev.delete(e.target.id);
        return prev;
      });
    }
  };
  const handleClick = (e) => {
    const v = e.target.id.split(",").map((z) => parseInt(z));
    //After the first click generate the matrix
    if (!counter.current.size) obj.current = matrix(9, v);

    if (obj.current.applyValues[v[0]][v[1]] === 0) {
      const allCoor = [];
      const initial = [{ i: v[0], j: v[1] }];
      const t = obj.current.recursive({ initial, allCoor }).allCoor;
      const stringForm = t.map((item) => `${item.i},${item.j}`);
      stringForm.forEach(counter.current.add, counter.current);
      if (counter.current.size >= 71) {
        setWin(0);
        setMines((prev) => {
          obj.current.coordinatesBombs.map((item) => {
            prev[item.i][item.j] = "f";
          });
          return [...prev];
        });
      }
      setCountFlags((prev) => {
        stringForm.forEach((element) => {
          prev.delete(element);
        });
        return prev;
      });
      setMines((prev) => {
        t.map((item) => {
          prev[item.i][item.j] = obj.current.applyValues[item.i][item.j].toString();
        });
        return [...prev];
      });
    } else if (obj.current.applyValues[v[0]][v[1]] >= 1) {
      setMines((prev) => {
        prev[v[0]][v[1]] = obj.current.applyValues[v[0]][v[1]].toString();
        return [...prev];
      });
      counter.current.add(`${v[0]},${v[1]}`);
      if (counter.current.size >= 71) {
        setWin(0);
        setMines((prev) => {
          obj.current.coordinatesBombs.map((item) => {
            prev[item.i][item.j] = "f";
          });
          return [...prev];
        });
      }
    } else {
      setCover("225px");
      setWin(1);
      setMines((prev) => {
        obj.current.coordinatesBombs.map((item) => {
          if (prev[item.i][item.j] !== "f") prev[item.i][item.j] = "b";
        });
        prev[v[0]][v[1]] = "mr"; //mine red

        Array.from(countFlags)
          .map((item) => item.split(","))
          .forEach((item) => {
            if (obj.current.applyValues[item[0]][item[1]] !== -1) {
              prev[item[0]][item[1]] = "mw"; //mine wrong
            }
          });

        return [...prev];
      });
    }
  };

  return (
    <div>
      <div>
        {obj.current.applyValues.map((_, i) => {
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
      <div>
        {
          (() => {
            if (win === 0) return 0;
            return 10 - countFlags.size;
          })()
          /* 10 - countFlags.size */
        }
      </div>
      <div
        onClick={() => {
          obj.current = matrix(9);
          setMines(
            Array.from(Array(9), () => {
              return new Array(9).fill("");
            })
          );
          setCover("0px");
          setWin(2);
          setCountFlags(new Set());
          counter.current.clear();
        }}
        className={(() => {
          switch (win) {
            case 0:
              return "face_win";
            case 1:
              return "face_lose";
            default:
              return "face_unpressed";
          }
        })()}
        style={{ width: "50px", height: "50px", margin: "auto" }}
      ></div>

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
        <div className="grid-container">
          {mines.map((_, i) => {
            return (
              <>
                {_.map((c, j) => {
                  return <Tile c={c} i={i} j={j} handleClick={handleClick} handleRightClick={handleRightClick} />;
                })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Mines;
