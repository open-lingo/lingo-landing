import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/** Hostnames that belong to us and must only ever come from env vars. */
const FORBIDDEN = ["openlingoapp", "openlingo.app"];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx|css|md)$/.test(entry) ? [full] : [];
  });
}

describe("no hardcoded Open Lingo hostnames", () => {
  it("keeps every own-domain reference in environment variables", () => {
    const offenders: string[] = [];
    for (const file of sourceFiles("src")) {
      if (file.endsWith("noHardcodedHosts.test.ts")) continue;
      const text = readFileSync(file, "utf8");
      for (const needle of FORBIDDEN) {
        if (text.includes(needle)) offenders.push(`${file}: ${needle}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
