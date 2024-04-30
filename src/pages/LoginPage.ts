import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import logger from "../utils/LoggerUtil";

export default class LoginPage {
  private readonly usernameInputSelector = "#username";
  private readonly passwordInputSelector = "#password";
  private readonly LoginButtonSelector = "#Login";

  constructor(private page: Page) {}
  async navigateToLoginPage() {
    await this.page.goto("/");
    logger.info("Navigated to login.salesforce.com");
  }
  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
    logger.info("Filled username");
  }
  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
    logger.info("Filled password");
  }
  async clickLoginButton() {
    await this.page
      .locator(this.LoginButtonSelector)
      .click()
      .catch((error) => {
        logger.error(`Error clicking login button: ${error}`);
        throw error;
      })
      .then(() => logger.info("Clicked login button"));

    const homePage = new HomePage(this.page);
    return homePage;
  }
}
