import { Page } from "@playwright/test";
import HomePage from "./HomePage";

export default class LoginPage {
  private readonly usernameInputSelector = "#username";
  private readonly passwordInputSelector = "#password";
  private readonly LoginButtonSelector = "#Login";

  constructor(private page: Page) {}
  async navigateToLoginPage() {
    await this.page.goto("/");
  }
  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
  }
  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
  }
  async clickLoginButton() {
    await this.page
      .locator(this.LoginButtonSelector)
      .click()
      .catch((error) => {
        console.error(`Error clicking login button: ${error}`);
        throw error;
      });

    const homePage = new HomePage(this.page);
    return homePage;
  }
}
