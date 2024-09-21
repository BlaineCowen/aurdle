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
    if (checkValue === 1) return "v";
    if (checkValue === -1) return "^";
    return ""; // No check yet
  };

  const getCheckColor = (checkValue: number | undefined) => {
    if (checkValue === 0) return "bg-green-300";
    if (checkValue === -1) return "bg-blue-300";
    if (checkValue === 1) return "bg-red-300";
    if (checkValue === 2) return "bg-yellow-300";
    return "bg-gray-200"; // Default gray
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <div className="grid grid-cols-5 gap-2 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
        {gridItems.map((item, i) => (
          <div
            key={`grid-item-${roundNumber}-${item}`} // Ensure unique key
            className={`aspect-square ${getCheckColor(
              checkArray[i]
            )} rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-sm flex items-center justify-center`}
            aria-label={`Grid cell ${item + 1}`}
          >
            <h3 className="text-black">{notes[i]}</h3>
            <span className="text-sm text-gray-600">
              {getCheckLabel(checkArray[i])}
            </span>
          </div>
        ))}
      </div>
      {/* <p>{checkArray.join(", ")}</p> */}
    </div>
  );
}
