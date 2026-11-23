// One-line pitch entry for make.fun's "A Day of One-Line Pitches".
// Writes a single sentence (at most 240 characters) to /output/entry.txt.
// The sentence is the whole entry: it must convince a friend who has never
// coded to let an AI agent build their first app idea on make.fun.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const PITCH =
  "Hand that dog-walking list you keep in your head to an AI agent on make.fun and watch it become a real app you can tap — free to try, yours to keep, no coding, no installing anything.";

const MAX_PITCH_LENGTH = 240;
const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  const sentence = PITCH.trim();
  if (sentence.length === 0) {
    throw new Error("Pitch must not be empty.");
  }
  if (sentence.length > MAX_PITCH_LENGTH) {
    throw new Error(
      `Pitch must be at most ${MAX_PITCH_LENGTH} characters, got ${sentence.length}.`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, sentence, "utf8");
  console.log(`Wrote ${sentence.length} characters to ${OUTPUT_PATH}`);

  // Read-back verification: the file on disk must be exactly the pitch
  // and still within the 240-character limit.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== sentence) {
    throw new Error("Verification failed: /output/entry.txt does not match the pitch.");
  }
  if (written.length > MAX_PITCH_LENGTH) {
    throw new Error(
      `Verification failed: entry is ${written.length} characters, over the ${MAX_PITCH_LENGTH} limit.`,
    );
  }
  console.log(`Verified entry.txt: ${written.length} characters, matches pitch.`);
}

main();
