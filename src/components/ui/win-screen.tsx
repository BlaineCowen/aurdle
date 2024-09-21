"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface WinScreenProps {
  results?: number[];
}

const colorMap: { [key: number]: string } = {
  "-1": "🟥", // Black square for -1
  "0": "🟩", // Red square for 0
  "1": "🟥", // Yellow square for 1
  "2": "🟨", // Green square for 2
};

export default function WinScreen({ results = [] }: WinScreenProps) {
  const [isCopied, setIsCopied] = useState(false);

  const getEmojiGrid = () => {
    let grid = "";
    for (let i = 0; i < 25; i++) {
      grid += colorMap[results[i]] || "⬜"; // Default to white square if value not in colorMap
      if ((i + 1) % 5 === 0) grid += "\n";
    }
    return grid.trim();
  };

  const handleShare = async () => {
    const text = `Check out my result!\n\n${getEmojiGrid()}\n\nPlay now at [aurdle.vercel.app](https://aurdle.vercel.app)`;

    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste your result anywhere.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  // If results is not provided or empty, show a loading state or error message
  if (!results || results.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          Results Unavailable
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 border-gray-900 border-2 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text--800 dark:text-gray-200">
        You Win!
      </h2>
      <div className="flex justify-center">
        <div className="grid grid-cols-5 m-2 w-1/2" aria-label="Result grid">
          {results.map((value, index) => (
            <div
              key={index}
              className="aspect-square flex items-center justify-center text-2xl"
            >
              {colorMap[value] || "⬜"}
            </div>
          ))}
        </div>
      </div>
      <Button onClick={handleShare} className="w-1/2">
        {isCopied ? "Copied!" : "Copy to Clipboard"}
      </Button>
    </div>
  );
}
