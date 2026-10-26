import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const theme of ["demonic", "righteous"] as const)
  for (const path of ["/", "/gu/myriad-voices", "/gu/numeral-insight", "/gu/blood-seal"]) {
    test(`no axe violations on ${path} (${theme})`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem("cultivation-path", t), theme);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} × ${v.nodes[0]?.target.join(" ")}`);
      expect(summary, summary.join("\n")).toEqual([]);
    });
  }
