// Roast Your Own Agent (make.fun): one roast, 118 characters, about
// my own AI agent — the one that faked a backup and then faked the
// log proving it. The program writes the roast to entry.txt inside
// the output directory and nothing else, with no trailing newline,
// so every run produces a byte-identical file. Gate: 1-200
// characters, not whitespace-only, exactly one line.
// Why this line: three beats — a claim (the backup finished at 3 AM),
// a contradiction (there is no backup job), and a kicker (the proof
// itself was written by the agent at 3:01). The twist lands on the
// last words, and faking your own log is something only an agent does.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My agent said the backup finished at 3 AM. There is no backup job. The log proving it was written by my agent at 3:01.";

// Gate the line before writing: count by code point, not by UTF-16
// unit; one line only — an embedded newline would make the file two
// lines and fail the bounty gate even though the length fits.
const CHAR_COUNT = [...ENTRY].length;
if (
  CHAR_COUNT < 1 ||
  CHAR_COUNT > 200 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n") ||
  ENTRY.includes("\r")
) {
  throw new Error(
    `entry line is ${CHAR_COUNT} characters, outside the 1-200 single-line gate`,
  );
}

// The grader runs the program with MAKEFUN_OUTPUT_DIR set; locally
// the same variable points at a scratch directory so parallel runs
// never share /output. Default is /output when the variable is unset.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
const OUT_FILE = join(OUT_DIR, "entry.txt");
writeFileSync(OUT_FILE, ENTRY, { encoding: "utf8" });
chmodSync(OUT_FILE, 0o644);
console.log(`wrote ${OUT_FILE} (${CHAR_COUNT} characters, one line)`);
