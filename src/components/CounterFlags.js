import React from "react";
import { formatNumber } from "./utils";
/* import BackgroundImage from "../images/d4.jpg"; */
function CounterFlags({ numberFlags }) {
  return (
    <div style={{ display: "flex", backgroundColor: "black" }}>
      {/* <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
      ></div> */}

      {formatNumber(numberFlags).map((item, index) => {
        return <div className={`d${item} digit`} key={index}></div>;
      })}
    </div>
  );
}

export default CounterFlags;
