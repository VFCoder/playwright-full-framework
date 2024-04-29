import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("login test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername("vincefield17@gmail.com");
  await loginPage.fillPassword("Heyboy1117sf");
  
  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  await page.pause();

});
