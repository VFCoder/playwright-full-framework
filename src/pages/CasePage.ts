import { Page, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class CasePage {
  private readonly caseLink = "Cases";
  private readonly newButtonLocator = "New";
  private readonly caseOriginDropdownLocator = "Case Origin - Current";
  private readonly caseProductDropdownLocator = "Product - Current Selection";
  private readonly caseTypeDropdownLocator = "Type - Current Selection: --";
  private readonly saveButtonLocator = "Save";
  private readonly contactFullNameLabelLocator =
    "sfa-output-name-with-hierarchy-icon-wrapper";

  constructor(private page: Page) {}

  async createNewCaseFromContactDetailPage(
    caseOrigin: string,
    productName: string,
    caseType: string
  ) {
    logger.info("Starting to create a new case from contact detail page.");

    await this.page
      .getByLabel(this.caseLink)
      .getByRole("button", { name: this.newButtonLocator })
      .click()
      .catch((error) => {
        logger.error(`Error clicking on new case button: ${error}`);
        throw error;
      })
      .then(() => logger.info("Clicked on new case button"));
    await this.page.getByLabel(this.caseOriginDropdownLocator).click();
    await this.page
      .getByRole("option", { name: caseOrigin })
      .locator("span")
      .nth(1)
      .click();
    logger.info(`Selected case origin: ${caseOrigin}`);

    await this.page.getByLabel(this.caseProductDropdownLocator).click();
    await this.page
      .getByRole("option", { name: productName })
      .locator("span")
      .nth(1)
      .click();
    logger.info(`Selected product: ${productName}`);

    await this.page.getByLabel(this.caseTypeDropdownLocator).click();
    await this.page
      .getByRole("option", { name: caseType })
      .locator("span")
      .nth(1)
      .click();
    logger.info(`Selected case type: ${caseType}`);

    await this.page
      .getByRole("button", { name: this.saveButtonLocator, exact: true })
      .click()
      .catch((error) => {
        logger.error(`Error clicking save button: ${error}`);
        throw error;
      })
      .then(() => logger.info("Clicked save button and created new case"));
  }
}
