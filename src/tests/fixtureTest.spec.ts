import { test } from "../fixtures/loginFixture";

test("Fixture text", async ({ homePage }) => {
    await homePage.expectServiceTitleToBeVisible();
})