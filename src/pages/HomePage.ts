import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";
import ContactPage from "./ContactPage";

export default class HomePage {
  private readonly serviceTitleLocator = "Service";
  private readonly contactsLinkLocator = "Contacts";
  constructor(private page: Page) {}

  async expectServiceTitleToBeVisible() {
    await expect(this.page.getByTitle(this.serviceTitleLocator))
      .toBeVisible({
        timeout: 15000,
      })
      .catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error;
      })
      .then(() => logger.info("Service title is visible"));
  }

  async navigateToContactTab() {
    await expect(
      this.page.getByRole("link", { name: this.contactsLinkLocator })
    ).toBeVisible();
    logger.info("Contacts tab is visible");
    await this.page
      .getByRole("link", { name: this.contactsLinkLocator })
      .click();
    logger.info("Contacts tab is clicked");
    return new ContactPage(this.page);
  }
}
