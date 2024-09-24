import { useState, useEffect } from "react";
import { Howl } from "howler";

interface PlayProps {
  audioFiles: string[];
  roundNumber: number;
}

export default function Play({ audioFiles, roundNumber }: PlayProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [remainingPlays, setRemainingPlays] = useState(1);
  const [chordObjects, setChordObjects] = useState<{ [key: string]: Howl }>({});

  const noteObject: { [key: string]: number } = {
    C3: 1,
    "C#3": 2,
    D3: 3,
    "D#3": 4,
    E3: 5,
    F3: 6,
    "F#3": 7,
    G3: 8,
    "G#3": 9,
    A3: 10,
    "A#3": 11,
    B3: 12,
    C4: 13,
    "C#4": 14,
    D4: 15,
    "D#4": 16,
    E4: 17,
    F4: 18,
    "F#4": 19,
    G4: 20,
    "G#4": 21,
    A4: 22,
    "A#4": 23,
    B4: 24,
  };
  // Map note names to audio sprites
  const chordNames = ["first", "second", "third", "fourth", "fifth"];

  useEffect(() => {
    if (audioFiles.length === 5) {
      // put audiofiles in order
      const unsortedNotes = audioFiles.map((note: string) =>
        note.replace(".mp3", "").replace("sharp", "#")
      );
      const sortedNotes = unsortedNotes.sort(
        (a: string, b: string) => noteObject[a] - noteObject[b]
      );

      for (let i = 0; i < chordNames.length; i++) {
        chordObjects[chordNames[i]] = new Howl({
          src: `../samples/${sortedNotes[i].replace("#", "sharp")}.mp3`,
          volume: 0.5,
        });
      }

      setChordObjects(chordObjects);
    }
  }, [audioFiles]);

  const remainingPalysArr = [1, 2, 3, 3, 3];
  useEffect(() => {
    setRemainingPlays(remainingPalysArr[roundNumber - 1]); // Reset remaining plays when the round changes
  }, [roundNumber]);

  const playRandomSamples = () => {
    if (audioFiles.length === 0 || remainingPlays <= 0) {
      console.error("You have no more plays left!");
      return;
    }

    setIsPlaying(true);

    if (roundNumber === 1) {
      // Play all sprites (chords) simultaneously
      for (let i = 0; i < chordNames.length; i++) {
        chordObjects[chordNames[i]].play();
      }
    } else if (roundNumber == 2 || roundNumber == 3) {
      // Play one sprite (chord) at a time with a delay
      let delay = 100 * roundNumber;
      for (let i = 0; i < chordNames.length; i++) {
        setTimeout(() => {
          chordObjects[chordNames[i]].play();
        }, delay * i);
      }
    } else if (roundNumber === 4 || roundNumber === 5) {
      let delay = 100 * roundNumber;
      let totalAscTime = delay * chordNames.length;

      // Play ascending notes
      for (let i = 0; i < chordNames.length; i++) {
        setTimeout(() => {
          chordObjects[chordNames[i]].play();
        }, delay * i);
      }

      // Play descending notes after ascending finishes
      for (let i = chordNames.length - 1; i >= 0; i--) {
        setTimeout(() => {
          chordObjects[chordNames[i]].play();
        }, totalAscTime + delay * (chordNames.length - i));
      }
    }

    // Decrement remaining plays
    setRemainingPlays((prev) => prev - 1);
    setIsPlaying(false); // Reset playing state
  };

  return (
    <div className="m-2 flex-wrap">
      <button
        className="shadcdn-btn bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={playRandomSamples}
        disabled={isPlaying}
      >
        {isPlaying ? "Playing..." : "Play Hint"}
      </button>
      <div className="flex w-full justify-center mt-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index < remainingPlays ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
