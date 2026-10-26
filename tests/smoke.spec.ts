import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("renders the hero, every section and no horizontal scroll", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Sulaiman");
    for (const name of ["The ascent", "Major Gu", "Lesser Gu", "Sects joined", "Battle record", "Gu arsenal", "Summon"]) {
      await expect(page.getByRole("heading", { name, level: 2 })).toBeVisible();
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });

  test("Lesser Gu filter narrows the cards", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#lesser");
    const cards = section.getByRole("listitem");
    await expect(cards).toHaveCount(6);

    const theft = section.getByRole("button", { name: /Theft/ });
    await theft.click();
    await expect(theft).toHaveAttribute("aria-pressed", "true");
    await expect(cards).toHaveCount(2);

    await section.getByRole("button", { name: /All/ }).click();
    await expect(cards).toHaveCount(6);
  });

  test("contact: validates, opens the mail app, copies the address", async ({ page, context, browserName }) => {
    await page.goto("/#summon");
    const status = page.locator("#c-status");

    await page.getByLabel("The problem").fill("short");
    await page.getByRole("button", { name: "Open in mail app" }).click();
    await expect(status).toContainText("at least 10 characters");

    await page.getByLabel("Subject").fill("Backend role");
    await page.getByLabel("The problem").fill("We need help scaling our queue workers.");
    await page.getByRole("button", { name: "Open in mail app" }).click();
    await expect(status).toContainText("Opening your mail app");

    if (browserName === "chromium") {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.getByRole("button", { name: "Copy email" }).click();
      await expect(status).toContainText("Copied");
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("sulaimanclass12b@gmail.com");
    }
  });

  test("Major Gu cards open their dossiers", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("#major")
      .getByRole("link", { name: /Myriad Voices Gu/ })
      .click();
    await expect(page).toHaveURL(/\/gu\/myriad-voices$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Myriad Voices Gu");
  });
});

test("path switch changes the theme and remembers it", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveAttribute("data-theme", "righteous");
  const ground = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const dark = await ground();

  await page.getByRole("radio", { name: /Righteous/ }).click();
  await expect(html).toHaveAttribute("data-theme", "righteous");
  await expect(page.getByRole("radio", { name: /Righteous/ })).toHaveAttribute("aria-checked", "true");
  expect(await ground()).not.toBe(dark);

  await page.goto("/gu/blood-seal");
  await expect(html).toHaveAttribute("data-theme", "righteous");

  await page.getByRole("radio", { name: /Demonic/ }).click();
  await expect(html).not.toHaveAttribute("data-theme", "righteous");
});

test.describe("dossiers", () => {
  for (const slug of ["myriad-voices", "numeral-insight", "blood-seal"]) {
    test(`${slug} renders with gallery and next link`, async ({ page }) => {
      await page.goto(`/gu/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const thumbs = page.getByRole("group", { name: "Choose a screen" }).getByRole("button");
      await expect(thumbs).toHaveCount(4);
      await thumbs.nth(2).click();
      await expect(thumbs.nth(2)).toHaveAttribute("aria-pressed", "true");
      await expect(page.getByRole("link", { name: /Next Gu/ })).toBeVisible();
    });
  }

  test("unknown Gu shows the 404 page", async ({ page }) => {
    const res = await page.goto("/gu/not-a-gu");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("This Gu self-detonated.")).toBeVisible();
  });
});

test("share images are generated", async ({ request }) => {
  for (const path of ["/opengraph-image", "/gu/myriad-voices/opengraph-image"]) {
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  }
});
