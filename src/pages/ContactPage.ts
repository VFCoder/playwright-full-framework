import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class ContactPage {
  private readonly contactsLink = "Contacts";
  private readonly newButtonLocator = "New";
  private readonly firstNameTextFieldLocator = "First Name";
  private readonly lastNameTextFieldLocator = "Last Name";
  private readonly saveButtonLocator = "Save";
  private readonly contactFullNameLabelLocator =
    "sfa-output-name-with-hierarchy-icon-wrapper";

  constructor(private page: Page) {}

  async createNewContact(fname: string, lname: string) {
    await this.page.getByRole("link", {name: this.contactsLink}).click();
    await this.page
      .getByRole("button", { name: this.newButtonLocator })
      .click();
    logger.info("New button is clicked");
    await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
    await this.page
      .getByPlaceholder(this.firstNameTextFieldLocator)
      .fill(fname);
    logger.info(`First name is filled as ${fname}`);
    await this.page.getByPlaceholder(this.lastNameTextFieldLocator).click();
    await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname);
    logger.info(`Last name is filled as ${lname}`);
    await this.page
      .getByRole("button", { name: this.saveButtonLocator, exact: true })
      .click()
      .catch((error) => {
        logger.error(`Error clicking save button: ${error}`);
        throw error;
      })
      .then(() => logger.info("Save button is clicked"));
  }

  async expectContatLabelContainsFirstNameAndLastName(
    fname: string,
    lname: string
  ) {
    await expect(
      this.page.locator(this.contactFullNameLabelLocator)
    ).toContainText(`${fname} ${lname}`);
    logger.info(`New contact created and ${fname} ${lname} is visible`);
    await this.page.getByRole("link", { name: this.contactsLink }).click();
  }
}
