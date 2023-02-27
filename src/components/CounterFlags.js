import React from "react";
/* import BackgroundImage from "../images/d4.jpg"; */

function CounterFlags({ numberFlags }) {
  const n = 10 - numberFlags;
  const formatNumber = ((n) => {
    //convert from -3 to ["0", "-", "3"]
    const str = n.toString().split("").reverse();
    const fill = ["0", "0", "0"];
    str.forEach((item, key) => {
      fill[key] = item;
    });
    return fill.reverse();
  })(n);

  return (
    <div>
      {/* <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
      ></div> */}
      <div>
        {formatNumber.map((item, index) => {
          return <div className={`d${item} digit`} key={index}></div>;
        })}
      </div>

      {n}
    </div>
  );
}

export default CounterFlags;
