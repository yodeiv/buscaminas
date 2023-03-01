import React, { useState, useRef } from "react";
import Tile from "./Tile";
import matrix from "./utils";
import CounterFlags from "./CounterFlags";
import Counter from "./Counter";
function Mines() {
  const clickCounter = useRef(new Set());
  const [mines, setMines] = useState(
    Array.from(Array(9), () => {
      return new Array(9).fill("");
    })
  );

  const obj = useRef();
  const [cover, setCover] = useState("0px");
  const [win, setWin] = useState("face_neutral");
  const [countFlags, setCountFlags] = useState(new Set());
  const [startCounter, setStartCounter] = useState(0);

  const handleReset = () => {
    //Do not reset if the game hasn't been started
    if (clickCounter.current.size === 0 && countFlags.size === 0) return;

    obj.current = matrix([9, 9]);
    setMines(
      Array.from(Array(9), () => {
        return new Array(9).fill("");
      })
    );
    setCover("0px");
    setWin("face_neutral");
    setCountFlags((prev) => {
      prev.clear();
      return prev;
    });
    clickCounter.current.clear();
    setStartCounter(0);
  };

  const endWin = () => {
    //Fill the number of flags up to 10 with 0,1...,9
    setCountFlags(new Set(Array.from(Array(10).keys())));
    setStartCounter("paused");
    setWin("face_win");
    setMines((prev) => {
      obj.current.coordinatesBombs.forEach((item) => {
        prev[item.i][item.j] = "f";
      });
      return [...prev];
    });
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    const v = e.target.id.split(",").map((z) => parseInt(z));
    if (e.target.className === "closed tile") {
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
    //Wait for the first click, after of which the matrix get gerenated
    if (!clickCounter.current.size) {
      obj.current = matrix([9, 9], v);
      setStartCounter("started");
    }
    //If the click is on an empty space
    if (obj.current.mainMatrix[v[0]][v[1]] === 0) {
      const allCoor = [];
      const initial = [{ i: v[0], j: v[1] }];
      const t = obj.current.recursive({ initial, allCoor }).allCoor;
      const stringForm = t.map((item) => `${item.i},${item.j}`);
      stringForm.forEach(clickCounter.current.add, clickCounter.current);
      //Checks if the player won based on the number of clicks
      if (clickCounter.current.size >= 71) endWin();
      setCountFlags((prev) => {
        stringForm.forEach((element) => {
          prev.delete(element);
        });
        return prev;
      });
      setMines((prev) => {
        t.forEach((item) => {
          prev[item.i][item.j] = obj.current.mainMatrix[item.i][item.j].toString();
        });
        return [...prev];
      });
      //If the click is on an number
    } else if (obj.current.mainMatrix[v[0]][v[1]] >= 1) {
      setMines((prev) => {
        prev[v[0]][v[1]] = obj.current.mainMatrix[v[0]][v[1]].toString();
        return [...prev];
      });
      clickCounter.current.add(`${v[0]},${v[1]}`);
      //Checks if the player won based on the number of clicks
      if (clickCounter.current.size >= 71) endWin();
      //If the click is on a mine
    } else {
      setStartCounter("paused");
      setCover("225px");
      setWin("face_lose");
      setMines((prev) => {
        obj.current.coordinatesBombs.forEach((item) => {
          if (prev[item.i][item.j] !== "f") prev[item.i][item.j] = "b";
        });
        prev[v[0]][v[1]] = "mr"; //mine red

        Array.from(countFlags)
          .map((item) => item.split(","))
          .forEach((item) => {
            if (obj.current.mainMatrix[item[0]][item[1]] !== -1) {
              prev[item[0]][item[1]] = "mw"; //mine wrong
            }
          });

        return [...prev];
      });
    }
  };

  return (
    <div>
      <CounterFlags numberFlags={countFlags.size} />
      <div
        onClick={handleReset}
        className={`${win} face`}
        style={{ width: "50px", height: "50px", margin: "auto" }}
      ></div>
      <Counter start={startCounter} />
      <div
        className="cover"
        style={{
          width: cover,
          height: cover,
        }}
      ></div>
      <div>
        <div className="grid-container">
          {mines.map((_, i) => {
            return (
              <React.Fragment key={i}>
                {_.map((c, j) => {
                  return (
                    <Tile
                      cij={{ c, i, j }}
                      handleClick={handleClick}
                      handleRightClick={handleRightClick}
                      key={`${i},${j}`}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Mines;
