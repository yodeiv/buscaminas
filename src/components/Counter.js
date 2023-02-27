import React, { useState, useEffect, useRef } from "react";

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

  const formatNumber = (n) => {
    const str = n.toString().split("").reverse();
    const fill = ["0", "0", "0"];
    str.forEach((item, key) => {
      fill[key] = item;
    });
    return fill.reverse();
  };

  return (
    <div>
      <div>
        {formatNumber(time).map((item, index) => {
          return <div className={`d${item} digit`} key={index}></div>;
        })}
      </div>
      {time}
    </div>
  );
}

export default Counter;
