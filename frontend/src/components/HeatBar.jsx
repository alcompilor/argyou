import React, { useEffect, useState } from "react";

export const HeatBar = ({ heatScore }) => {
  const [heatScoreInPercent, setHeatScoreInPercent] = useState(0);
  const [barColor, setBarColor] = useState("bg-gray-200 dark:bg-gray-400");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeatScoreInPercent(heatScore * 100);
      
      if (heatScoreInPercent < 33.3) {
        setBarColor("bg-green-400 dark:bg-green-500");
      } else if (heatScoreInPercent < 66.6) {
        setBarColor("bg-yellow-300 dark:bg-yellow-500");
      } else if (heatScoreInPercent <= 100.0) {
        setBarColor("bg-red-500 dark:bg-red-500");
      }
    }, 2000);
    
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="py-12 px-4 flex justify-center items-center">
        <div className="w-3.5 bg-gray-200 rounded h-60 mb-4 dark:bg-gray-700 relative">
          <div
            className={`${barColor} w-3.5 rounded absolute bottom-0 duration-300`}
            style={{height: `${heatScoreInPercent}%`}}
          ></div>
        </div>
      </div>
    </>
  );
};
