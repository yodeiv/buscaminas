import React, { useState, useRef } from "react";
import Tile from "./Tile";
import matrix from "./utils";
import CounterFlags from "./CounterFlags";
import Counter from "./Counter";
import Options from "./Options";
import StyledGrid from "../styledComponents/StyledGrid";
import StyledCover from "../styledComponents/StyledCover";

function Mines() {
  //initial object passed to "setting" correspond to beginner level
  const [setting, setSetting] = useState({ dimension: [8, 8], startingCoor: [], numberOfMines: 4 });
  const clickCounter = useRef(new Set());
  const [mines, setMines] = useState(
    Array.from(Array(setting.dimension[0]), () => {
      return new Array(setting.dimension[1]).fill("");
    })
  );

  const obj = useRef();
  const [win, setWin] = useState("face_neutral");
  const [countFlags, setCountFlags] = useState(new Set());
  const [startCounter, setStartCounter] = useState(0);

  const handleReset = () => {
    //If condition for not resetting if the game hasn't been started
    if (clickCounter.current.size === 0 && countFlags.size === 0) return;
    reset(setting.dimension);
  };

  const reset = (d) => {
    //This function is used twice
    setMines(
      Array.from(Array(d[0]), () => {
        return new Array(d[1]).fill("");
      })
    );
    setWin("face_neutral");
    setCountFlags((prev) => {
      prev.clear();
      return prev;
    });
    clickCounter.current.clear();
    setStartCounter(0);
  };

  const endWin = () => {
    //Fill the number of flags up to 10 with 0,1...,9 when the number of mines is 10
    setCountFlags(new Set(Array.from(Array(setting.numberOfMines).keys())));
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
      obj.current = matrix(setting.dimension, v, setting.numberOfMines);
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
      if (clickCounter.current.size >= setting.dimension[0] * setting.dimension[1] - setting.numberOfMines) endWin();
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
      if (clickCounter.current.size >= setting.dimension[0] * setting.dimension[1] - setting.numberOfMines) endWin();
      //If the click is on a mine
    } else {
      setStartCounter("paused");
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

  const changeDificulty = (o) => {
    setSetting(o);
    reset(o.dimension);
  };

  return (
    <div>
      <Options changeDificulty={changeDificulty} />
      <CounterFlags numberFlags={setting.numberOfMines - countFlags.size} />
      <div onClick={handleReset} className={`${win} face`}></div>
      <Counter start={startCounter} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <StyledCover win={win} dimension={setting.dimension} />
        <StyledGrid columns={setting.dimension[1]}>
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
        </StyledGrid>
      </div>
    </div>
  );
}

export default Mines;
