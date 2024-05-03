import { test, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import LoginPage from "../pages/LoginPage";
import { decrypt } from "../utils/CryptojsUtil";
import cdata from "../testdata/contacts.json";
import { convertCsvFileToJsonFile } from "../utils/CsvtoJsonUtil";
import {
  exportToCsv,
  exportToJson,
  generateTestData,
} from "../utils/FakerDataUtil";

test.skip("Simple DD test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const fname = "Dan";
  const lname = "Busche";

  logger.info("Test for contact creation is started...");
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(decrypt(process.env.userid!));
  await loginPage.fillPassword(decrypt(process.env.password!));

  const homePage = await loginPage.clickLoginButton();
  await homePage.expectServiceTitleToBeVisible();

  const contactsPage = await homePage.navigateToContactTab();
  await contactsPage.createNewContact(fname, lname);
  logger.info("Test for contact create is completed");
});

test.skip("csv to json", async () => {
  convertCsvFileToJsonFile("data.csv", "datademo.json");
});

for (const contact of cdata) {
  test(`Advanced DD test for ${contact.firstName} ${contact.lastName}`, async ({
    page,
  }) => {
    try {
      logger.info(
        `Starting test for contact creation: ${contact.firstName} ${contact.lastName}`
      );
      const loginPage = new LoginPage(page);
      await loginPage.navigateToLoginPage();
      logger.info("Logged into the application");

      await loginPage.fillUsername(decrypt(process.env.userid!));
      await loginPage.fillPassword(decrypt(process.env.password!));
      logger.info("Filled in credentials");

      const homePage = await loginPage.clickLoginButton();
      await homePage.expectServiceTitleToBeVisible();
      logger.info("Login successful and home page is visible");

      const contactsPage = await homePage.navigateToContactTab();
      logger.info("Navigated to contacts tab");

      await contactsPage.createNewContact(contact.firstName, contact.lastName);
      logger.info(
        `Created new contact: ${contact.firstName} ${contact.lastName}`
      );

      await contactsPage.expectContactLabelContainsFirstNameAndLastName(
        contact.firstName,
        contact.lastName
      );
      logger.info(
        `Verified contact creation for: ${contact.firstName} ${contact.lastName}`
      );

      logger.info(
        `Test completed successfully for: ${contact.firstName} ${contact.lastName}`
      );
    } catch (error) {
      logger.error(
        `Error during the test for: ${contact.firstName} ${contact.lastName} - ${error}`
      );
      throw error; // Ensuring the test fails in case of an error
    }
  });
}

test.skip("Faker", async () => {
  const testData = generateTestData(20);
  exportToJson(testData, "testData_faker.json");
  exportToCsv(testData, "testData_faker.csv");
});
