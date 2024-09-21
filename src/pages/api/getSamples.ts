import { readdir } from "fs/promises";
import { join } from "path";
import type { APIRoute } from "astro";

// Construct the correct path to the 'samples' folder in the public directory
const samplesDir = join(process.cwd(), "public", "samples");

export const GET: APIRoute = async () => {
  try {
    // Define the path to the public samples directory
    console.log("samplesDir:", samplesDir); // Debug the directory path

    // Read the files in the directory
    const files = await readdir(samplesDir);

    // Filter to only include mp3 files
    const audioFiles = files.filter((file) => file.endsWith(".mp3"));

    // pick 5 random files
    const shuffled = audioFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffled.slice(0, 5);

    // Return the list of files as JSON
    return new Response(JSON.stringify(selectedFiles), {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0", // Prevent caching
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Unable to fetch audio files" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
