import { test, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

test("API monitoring test", async ({ page }) => {
  page.on("request", (request) => {
    logger.info(`Requested Url is ${request.url()}`);
    logger.info(`Requested method is ${request.method()}`);
    logger.info(
      `Request headers are ${JSON.stringify(request.headers(), null, 2)}`
    );
  });

  page.on("response", (response) => {
    logger.info(`Response status is ${response.status()}`);
  });

  await page.goto("/");
});

test("API interception test", async ({ page }) => {
  await page.route("**/*", (route) => {
    const headers = route.request().headers();

    headers["Custom-Header"] = "integration check";
    console.log(headers);

    route.continue({ headers });
  });

  page.on("request", (request) => {
    logger.info(
      `Modified request header is ${JSON.stringify(
        request.headers(),
        null,
        2
      )} Modified request type is ${request.method()}`
    );
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");
});

test("API mocking test", async ({ page }) => {
  page.route(
    "https://demo.playwright.dev/api-mocking/api/v1/fruits",
    async (route) => {
      const json = [
        { name: "Mandarin", id: 3 },
        { name: "Tangerine", id: 1 },
        { name: "Clementines", id: 5 },
      ];
      await route.fulfill({ json });
    }
  );

  await page.goto("https://demo.playwright.dev/api-mocking/");
  await page.waitForLoadState("networkidle");
});
