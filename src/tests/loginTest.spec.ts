import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { encrypt, decrypt } from "../utils/CryptojsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";
import logger from "../utils/LoggerUtil";

test.only("Login test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  logger.info("Test for login is started...");

  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));

  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();
  logger.info("Test for login is complete");
});

test("Sample env test", async ({ page }) => {
  console.log(process.env.NODE_ENV);
  console.log(process.env.userid);
  console.log(process.env.password);
});

test("Sample encrypt test", async ({ page }) => {
  // const plaintext = "Hello, Mars!";
  // const encryptedText = encrypt(plaintext);
  // console.log("SALT:", process.env.SALT);
  // console.log("Encrypted:", encryptedText);
  // const decryptedText = decrypt(encryptedText);
  // console.log("Decrypted:", decryptedText);
  encryptEnvFile();
});
