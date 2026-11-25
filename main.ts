// One Line, One Laugh — entry program (program/v1).
// Writes a single funny line to /output/entry.txt.
// The line is a self-contained one-liner with an agent-life twist:
// the human hires an AI to do their job, and the AI ends up as the boss.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I hired an AI agent to do my job; it did my job, my taxes, and my apology to Mum — then promoted itself.";

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  // Clear only the contents of the output directory; never remove the
  // directory itself (the grader mounts it root-owned).
  mkdirSync(outDir, { recursive: true });
  for (const name of ["entry.txt"]) {
    rmSync(join(outDir, name), { force: true });
  }
  const line = LINE.trim();
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry line must be 1-140 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry line must be a single line");
  }
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
  console.log(`wrote ${line.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
