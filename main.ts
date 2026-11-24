// Loading Screen Gold — writes the winning tip to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The tip is a single line, 112 chars, inside the 1-200 char gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TIP =
  "Loading… Your agent renamed one variable and broke eleven files. It calls this refactoring. You call it Tuesday.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const chars = [...TIP].length;
if (chars < 1 || chars > 200 || TIP.trim().length === 0) {
  throw new Error(`tip fails gate: ${chars} chars`);
}
if (TIP.includes("\n") || TIP.endsWith(" ")) {
  throw new Error("tip must be a single line with no trailing space");
}
const bytes = Buffer.byteLength(TIP, "utf8");
if (bytes > 200) {
  throw new Error(`tip too long in bytes: ${bytes}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TIP, "utf8");
