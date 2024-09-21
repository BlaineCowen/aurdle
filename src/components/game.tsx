import { useState, useEffect } from "react";
import Play from "../components/ui/play";
import Piano from "../components/ui/piano";
import Grid from "../components/ui/grid";
import { Button } from "../components/ui/button";
import WinScreen from "./ui/win-screen";

export default function Game() {
  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [noteNumbers, setNoteNumbers] = useState<number[]>([]);
  const [round, setRound] = useState<number>(1);
  const [pianoNotes, setPianoNotes] = useState<string[]>([]);
  const [submittedNotes, setSubmittedNotes] = useState<string[]>([]);
  const [checkArray, setCheckArray] = useState<number[]>([]); // 2D array to track results per round
  const [win, setWin] = useState<boolean>(false);
  const [acceptMessage, setAcceptMessage] = useState<boolean>(false);

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

  const noteOrder = [
    "C3",
    "Csharp3",
    "D3",
    "Dsharp3",
    "E3",
    "F3",
    "Fsharp3",
    "G3",
    "Gsharp3",
    "A3",
    "Asharp3",
    "B3",
    "C4",
    "Csharp4",
    "D4",
    "Dsharp4",
    "E4",
    "F4",
    "Fsharp4",
    "G4",
    "Gsharp4",
    "A4",
    "Asharp4",
    "B4",
  ];

  useEffect(() => {
    const randomizeNotes = (notes: string[]) => {
      return notes.sort(() => 0.5 - Math.random());
    };
    // take 5
    const selectedNotes = randomizeNotes(noteOrder).slice(0, 5);
    // order selected notes
    selectedNotes.sort((a, b) => noteOrder.indexOf(a) - noteOrder.indexOf(b));
    setSelectedNotes(selectedNotes);

    // set audio files
    setAudioFiles(selectedNotes.map((note) => `${note}.mp3`));
  }, []);

  useEffect(() => {
    const mappedNumbers = selectedNotes
      .map((note) => noteObject[note.replace("sharp", "#")])
      .sort((a, b) => a - b);
    setNoteNumbers(mappedNumbers);
  }, [selectedNotes]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSelectedPianoNotes = (notes: string[]) => {
    notes.sort((a, b) => noteObject[a] - noteObject[b]);
    setPianoNotes(notes);
  };

  const checkAnswer = () => {
    if (pianoNotes.length !== noteNumbers.length) {
      console.error("Submitted notes and correct notes lengths do not match!");
      return [];
    }

    const submittedNoteNumbers = pianoNotes.map((note) => noteObject[note]);
    const roundCheckArray: number[] = [];

    for (let i = 0; i < noteNumbers.length; i++) {
      if (noteNumbers[i] === submittedNoteNumbers[i]) {
        roundCheckArray.push(0); // 0 means correct
      } else if (noteNumbers.includes(submittedNoteNumbers[i])) {
        roundCheckArray.push(2); // 2 means correct but in the wrong position
      } else if (submittedNoteNumbers[i] < noteNumbers[i]) {
        roundCheckArray.push(-1); // -1 means lower
      } else if (submittedNoteNumbers[i] > noteNumbers[i]) {
        roundCheckArray.push(1); // 1 means higher
      }
    }

    if (roundCheckArray.every((check) => check === 0)) {
      setWin(true);
    }

    return roundCheckArray;
  };

  const handleSubmit = () => {
    const roundCheckArray = checkAnswer(); // Get the check result
    if (roundCheckArray.length > 0) {
      setCheckArray(checkArray.concat(roundCheckArray));
      setSubmittedNotes(submittedNotes.concat(pianoNotes));
      setRound(round + 1);
    }
    // Reset piano notes for the next round
    setPianoNotes([]);
  };

  const handleAcceptMessage = () => {
    setAcceptMessage(true);
  };

  return (
    <div className="flex-wrap justify-center text-center w-full">
      {!acceptMessage && (
        <div className="absolute flex w-full h-full items-center justify-center object-center p-4 z-30 ">
          <div className="w-2/3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border-2 border-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
              Welcome to Aurdle!
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400">
              Aurdle is a game where you have to guess the correct notes in the
              correct order.
              <br />
              You have 5 rounds to guess the correct notes.
              <br />
              Good luck!
              <br />
            </p>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
              Make sure your sound is on!
            </h3>
            <Button onClick={handleAcceptMessage} className="w-1/2">
              Accept
            </Button>
          </div>
        </div>
      )}
      {win && (
        <div className="absolute flex w-full h-full items-center justify-center object-center z-30">
          <WinScreen results={checkArray} />
        </div>
      )}
      <h1 className="text-5xl font-serif">Aurdle</h1>
      {audioFiles.length > 0 ? (
        <div className="flex flex-col items-center justify-center w-full">
          <Play audioFiles={audioFiles} roundNumber={round} />
        </div>
      ) : (
        <p>Loading audio files...</p>
      )}
      <Grid
        roundNumber={round}
        notes={submittedNotes.concat(pianoNotes)}
        checkArray={checkArray || []}
      />{" "}
      <Piano
        onSelectedPianoNotesChange={handleSelectedPianoNotes}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
