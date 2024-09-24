import React, { useEffect } from "react";

export default function GreyGrid({
  roundNumber,
  notes,
  checkArray,
}: {
  roundNumber: number;
  notes: string[];
  checkArray: number[];
}) {
  const gridItems = Array.from({ length: 25 }, (_, i) => i);

  useEffect(() => {
    console.log(`Round ${roundNumber} notes:`, notes);
    console.log(checkArray);
  }, [roundNumber, checkArray]);

  const getCheckLabel = (checkValue: number | undefined) => {
    if (checkValue === undefined) return "";
    if (checkValue === 2) return "-";
    if (checkValue === 0) return "✓";
    if (checkValue === 1) return "↓";
    if (checkValue === -1) return "↑";
    return ""; // No check yet
  };

  const getCheckColor = (checkValue: number | undefined) => {
    if (checkValue === 0) return "bg-green-700";
    if (checkValue === -1) return "bg-gray-900 text-white";
    if (checkValue === 1) return "bg-gray-900 text-white";
    if (checkValue === 2) return "bg-yellow-300";
    return "bg-gray-500"; // Default gray
  };

  return (
    <div className="w-10/12 lg:w-1/3 md:w-1/2  mx-auto py-4 px-8">
      <div className="grid grid-cols-5 gap-2 bg-gray-700 p-4 border-2 border-black rounded-lg shadow-lg">
        {gridItems.map((item, i) => (
          <div
            key={`grid-item-${roundNumber}-${item}`} // Ensure unique key
            className={`aspect-square ${getCheckColor(
              checkArray[i]
            )} rounded-lg border-2 border-black shadow-sm flex items-center justify-center`}
            aria-label={`Grid cell ${item + 1}`}
          >
            <h3 className="text-sm md:text-xl lg:text-xl">{notes[i]}</h3>
            <span className="text-xs">{getCheckLabel(checkArray[i])}</span>
          </div>
        ))}
      </div>
      {/* <p>{checkArray.join(", ")}</p> */}
    </div>
  );
}
