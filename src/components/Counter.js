import React, { useState, useEffect, useRef } from "react";
import { formatNumber } from "./utils";

function Counter({ start }) {
  //Posible values of "start": 0, "started", "paused"
  const [time, setTime] = useState(0);
  const timer = useRef();

  useEffect(() => {
    if (start === "started") {
      timer.current = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else if (start === "paused") {
      clearInterval(timer.current);
    } else {
      setTime(0);
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [time, start]);

  return (
    <div>
      {formatNumber(time).map((item, index) => {
        return <div className={`d${item} digit`} key={index}></div>;
      })}
    </div>
  );
}

export default Counter;
