import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { encrypt, decrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";
import HomePage from "../pages/HomePage";

const authFile = "src/config/auth.json";

test("Login test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  logger.info("Test for login is started...");

  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));

  const homePage = await loginPage.clickLoginButton();
  //await page.pause();
  await homePage.expectServiceTitleToBeVisible();
  logger.info("Test for login is complete");

  await page.context().storageState({ path: authFile });
  logger.info("Auth state is saved");
});

test("Login with auth file", async ({ browser }) => {
  const context = await browser.newContext({ storageState: authFile });
  const page = await context.newPage();
  const homePage = new HomePage(page);

  await page.goto(
    "https://vfcoder-dev-ed.develop.lightning.force.com/lightning/page/home"
  );
  await homePage.expectServiceTitleToBeVisible();
  logger.info("Test for login is complete");
});

test("Login test with self heal", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername_selfheal("demo_selfheal");
});
