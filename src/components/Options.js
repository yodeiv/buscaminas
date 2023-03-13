import React, { useState, useRef } from "react";

function Options({ changeDificulty }) {
  const inputRef = useRef(null);
  const [hide, setHide] = useState(true);
  const [value, setValue] = useState("Beginner");
  const [height, setHeight] = useState("2");
  const [width, setWidth] = useState("2");
  const [mines, setMines] = useState("1");
  const [radioCheck, setRadioCheck] = useState([true, false, false, false]);

  const handleClick = () => {
    setHide(!hide);
  };

  const handleValidation = (e, setterFunction) => {
    const value = Number(e.target.value);
    const min = Number(e.target.min);
    const max = Number(e.target.max);
    if (value < min) {
      setterFunction(min);
    } else if (value >= min && value <= max) {
      setterFunction(value);
    } else {
      setterFunction(max);
    }
  };
  const handleDificulty = () => {
    if (height * width - 2 < mines) {
      setMines(height * width - 2);
    }
    switch (value) {
      case "Beginner":
        changeDificulty({ dimension: [9, 9], startingCoor: [], numberOfMines: 10 });
        setRadioCheck([true, false, false, false]);
        setHide(!hide);
        break;
      case "Intermediate":
        changeDificulty({ dimension: [16, 16], startingCoor: [], numberOfMines: 40 });
        setRadioCheck([false, true, false, false]);
        setHide(!hide);
        break;
      case "Expert":
        changeDificulty({ dimension: [16, 30], startingCoor: [], numberOfMines: 99 });
        setRadioCheck([false, false, true, false]);
        setHide(!hide);
        break;
      case "Custom":
        setRadioCheck([false, false, false, true]);
        changeDificulty({
          dimension: [+height, +width],
          startingCoor: [],
          numberOfMines: +mines,
        });
        setHide(!hide);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Dificulty</button>
      <b>
        {(() => {
          switch (radioCheck.indexOf(true)) {
            case 0:
              return "Beginner";
            case 1:
              return "Intermediate";
            case 2:
              return "Expert";
            case 3:
              return "Custom";
            default:
              return;
          }
        })()}
      </b>
      {!hide ? (
        <table className="table">
          <tbody>
            <tr className="header">
              <th style={{ paddingLeft: "6px", textAlign: "left" }}>Dificulty</th>
              <td colSpan="3" style={{ padding: "3px", textAlign: "right" }}>
                <span title="Close" className="close-dialog" onClick={() => setHide(true)}>
                  ×
                </span>
              </td>
            </tr>
            <tr className="dimensions">
              <td></td>
              <td>Height</td>
              <td>Width</td>
              <td>Mines</td>
            </tr>

            <tr>
              <th align="left">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="Beginner"
                    onChange={(e) => setValue(e.target.value)}
                    defaultChecked={radioCheck[0]}
                  />
                  Beginner
                </label>
              </th>
              <td>9</td>
              <td>9</td>
              <td>10</td>
            </tr>
            <tr>
              <th align="left">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="Intermediate"
                    onChange={(e) => setValue(e.target.value)}
                    defaultChecked={radioCheck[1]}
                  />
                  Intermediate
                </label>
              </th>
              <td>16</td>
              <td>16</td>
              <td>40</td>
            </tr>

            <tr>
              <th align="left">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="Expert"
                    onChange={(e) => setValue(e.target.value)}
                    defaultChecked={radioCheck[2]}
                  />
                  Expert
                </label>
              </th>
              <td>16</td>
              <td>30</td>
              <td>99</td>
            </tr>
            <tr>
              <th align="left">
                <label>
                  <input
                    type="radio"
                    name="option"
                    value="Custom"
                    onChange={(e) => {
                      setValue(e.target.value);
                      setTimeout(() => {
                        inputRef.current.focus();
                      }, 0);
                    }}
                    defaultChecked={radioCheck[3]}
                  />
                  Custom
                </label>
              </th>
              <td>
                <input
                  type="number"
                  ref={inputRef}
                  min={2}
                  max={80}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  onBlur={(e) => {
                    handleValidation(e, setHeight);
                  }}
                  disabled={value === "Custom" ? false : true}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={2}
                  max={80}
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  onBlur={(e) => {
                    handleValidation(e, setWidth);
                  }}
                  disabled={value === "Custom" ? false : true}
                />
              </td>
              <td>
                <input
                  type="number"
                  min={1}
                  max={height * width - 2}
                  value={mines}
                  onChange={(e) => setMines(e.target.value)}
                  onBlur={(e) => {
                    mines > 999 ? setMines(999) : handleValidation(e, setMines);
                  }}
                  disabled={value === "Custom" ? false : true}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <button onClick={handleDificulty}>New game</button>
                <button onClick={() => setHide(true)}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

export default Options;
