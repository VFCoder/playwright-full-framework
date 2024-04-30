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
  test.skip(`Advanced DD test for ${contact.firstName}`, async ({ page }) => {
    logger.info("Test for contact creation is started...");
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();

    const contactsPage = await homePage.navigateToContactTab();
    await contactsPage.createNewContact(contact.firstName, contact.lastName);
    await contactsPage.expectContatLabelContainsFirstNameAndLastName(
      contact.firstName,
      contact.lastName
    );
    logger.info("Test for contact create is completed");
  });
}

test("Faker", async () => {
  const testData = generateTestData(20);
  exportToJson(testData, "testData_faker.json");
  exportToCsv(testData, "testData_faker.csv");
});
