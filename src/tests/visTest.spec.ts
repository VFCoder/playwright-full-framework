import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("Verify logo placement and size", async ({ page }) => {
  await page.goto("/");
  const logo = page.getByAltText("Salesforce");
  const boundingBox = await logo?.boundingBox();
  if (boundingBox) {
    expect(boundingBox.width).toBe(160.8984375);
    expect(boundingBox.height).toBe(112.9921875);
  }
});

test("Confirm logo color", async ({ page }) => {
  await page.goto("/");
  const logo = page.getByAltText("Salesforce");
  const logoStyle = await logo.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return {
      color: style.color,
    };
  });
  expect(logoStyle.color).toBe("rgb(22, 50, 92)");
});

test("Screenshot compare test", async ({ page }) => {
  await page.goto("/");
  const loginPage = new LoginPage(page);
  await loginPage.fillUsername("Billy");
  await expect(page).toHaveScreenshot();
});
