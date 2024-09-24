import type { APIRoute } from "astro";

// This is the function that will generate or fetch your data.
const generateArrayOfStrings = (): string[] => {
  const possibleNotes = [
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
  //   pick 5 random notes
  const shuffled = possibleNotes.sort(() => 0.5 - Math.random());
  const selectedNotes = shuffled.slice(0, 5);

  // put in order
  const data = selectedNotes.sort(
    (a, b) => possibleNotes.indexOf(a) - possibleNotes.indexOf(b)
  );
  // Do your logic to fetch or generate new strings
  return data;
};

export const GET: APIRoute = async () => {
  const generatedData = generateArrayOfStrings();
  return new Response(JSON.stringify(generatedData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
