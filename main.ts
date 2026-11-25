// One Line, One Laugh — entry writer.
// Writes a single funny line (1-140 chars, one line) to /output/entry.txt.
// Self-check gate: length 1-140 chars, exactly one line, non-blank,
// plus byte-for-byte read-back verification before reporting success.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const ENTRY =
  "My agent read the meeting notes, summarized them in one word: 'pointless' — then billed me for the insight.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, ENTRY, "utf8");

// --- self-check gate ---
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}
const chars = [...ENTRY].length;
if (chars < 1 || chars > 140) {
  throw new Error(`entry length ${chars} chars outside gate 1-140`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is blank");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
console.log(`ok: ${chars} chars, 1 line, byte-for-byte verified -> ${outPath}`);
