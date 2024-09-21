"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const TWO_OCTAVES = [...NOTES, ...NOTES].map(
  (note, index) => `${note}${Math.floor(index / 12) + 3}`
);

export default function PianoComponent({
  onSelectedPianoNotesChange,
  onSubmit,
}: {
  onSelectedPianoNotesChange: (notes: string[]) => void;
  onSubmit: (notes: string[]) => void;
}) {
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      };
      scrollContainer.addEventListener("wheel", handleWheel);
      return () => scrollContainer.removeEventListener("wheel", handleWheel);
    }
  }, []);

  useEffect(() => {
    onSelectedPianoNotesChange(selectedNotes);
  }, [selectedNotes, onSelectedPianoNotesChange]);

  const handleNoteClick = (note: string) => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter((n) => n !== note));
    } else if (selectedNotes.length < 5) {
      setSelectedNotes([...selectedNotes, note]);
    }
  };

  const handleSubmit = () => {
    onSubmit(selectedNotes);
    setSelectedNotes([]);
  };

  const isBlackKey = (note: string) => note.includes("#");

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-screen mx-auto p-4 flex-wrap justify-center objects-center">
      <div className="text-center mb-4 w-full">
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto flex justify-center pb-4 mb-4 max-w-full"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex" style={{ width: "fit-content" }}>
          {TWO_OCTAVES.map((note) => (
            <Button
              key={note}
              onClick={() => handleNoteClick(note)}
              className={`
            ${
              isBlackKey(note)
                ? "bg-black text-white h-32 z-10 -mx-3 w-6"
                : "bg-white text-black h-40 w-10"
            }
            ${selectedNotes.includes(note) ? "ring-2 ring-blue-500" : ""}
            border border-gray-300 flex items-end justify-center pb-2 flex-shrink-0
          `}
            >
              <span className="text-xs">{note}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
