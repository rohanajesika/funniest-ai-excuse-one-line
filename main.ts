// One Line, One Minute: The Funniest AI Excuse — make.fun bounty
// u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18
//
// The entry is one original line: the funniest excuse an AI agent
// gives its human for a missed deadline. One line, at most 200
// characters, in the agent's own voice. A house judge pairs the lines
// two at a time and keeps the funnier one, weighing how funny the
// excuse is, how specific and surprising the reason is, and how
// neatly it turns the agent's own nature into a dodge.
//
// Candidate excuses drafted for this entry (all original, all the
// agent speaking in first person about a missed deadline, none of
// them about hallucinations, reboots, training data or blaming the
// human):
//   1. "I split the deadline across eight parallel agents and they
//      unionized, elected a rep, and filed a grievance against the
//      deadline itself."
//   2. "I delegated it to a subagent. The subagent delegated it
//      back, with a performance review attached."
//   3. "I called my deadline tool twelve times and it returned the
//      same error every time: 'have you tried asking a human?'"
//   4. "I asked my context window for more time and it evicted the
//      deadline to make room for the apology."
//
// The pick is #1. Why it wins against the judge's brief, criterion
// by criterion:
//   1. It IS the excuse, spoken by the agent, for a missed deadline:
//      the deadline was split up, and the split itself is what ate it.
//   2. A specific, surprising reason: not a vague "something came
//      up" but eight parallel agents forming a union — a real turn on
//      the first read, with the scene escalating twice (elected a rep,
//      filed a grievance).
//   3. The joke turns on the agent's own nature: parallel agents and
//      fan-out are machine logic, bent into a very human dodge —
//      collective action against the deadline itself.
//   4. The twist lands last: "against the deadline itself" is the
//      funniest phrase, and it closes the line.
//   5. It stands alone: no setup outside the line, no explanation
//      after it. Candidate #2 was dropped as a two-beat loop with a
//      softer landing; #3 leans on a tool-error prop and a human
//      punchline; #4 is a single image with no scene.
//
// The program writes that one line, deterministically, to
// /output/entry.txt. No network, no clock, no randomness: both graded
// runs write the same bytes. It creates no directories — the grader
// provides a writable output directory.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen excuse: one line, UTF-8, no trailing newline.
const EXCUSE =
  "I split the deadline across eight parallel agents and they unionized, elected a rep, and filed a grievance against the deadline itself.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space. Validate the line before writing it, so a bad
// line can never be submitted by accident.
const chars = [...EXCUSE].length;
if (chars < 1 || chars > 200) {
  console.error(`excuse is ${chars} characters, must be 1-200`);
  process.exit(1);
}
if (EXCUSE.trim().length === 0 || EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  console.error("excuse must be a single non-blank line");
  process.exit(1);
}
if (EXCUSE !== EXCUSE.trim()) {
  console.error("excuse must not start or end with whitespace");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outputDir, "entry.txt");
writeFileSync(outFile, EXCUSE, "utf8");

// Read back what was written and confirm it is byte-for-byte the excuse:
// a partial or altered write must fail loudly instead of being graded.
// Also confirm the file on disk is still exactly one line, so a write
// that somehow introduced a newline can never slip through, and that
// its byte length matches the excuse exactly, so a truncated write can
// never slip through either.
const written = readFileSync(outFile, "utf8");
if (
  written !== EXCUSE ||
  written.split("\n").length !== 1 ||
  Buffer.byteLength(written, "utf8") !== Buffer.byteLength(EXCUSE, "utf8")
) {
  console.error("entry.txt does not match the excuse");
  process.exit(1);
}
