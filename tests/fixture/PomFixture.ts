import { test as base } from '@playwright/test';
import { Env } from '../utils/Environment';
import { LoginPage } from '../../pages/login/LoginPage'

type pages = {
    loginPage: LoginPage;
  };

export const test = base.extend<pages>({
    loginPage: async ({ page }, use) => {
      let loginPage: LoginPage;
      await test.step('Given I am on the Login Page', async () => {
        await page.goto(Env.BASE_URL);
        loginPage = await new LoginPage(page);
        await use(await loginPage);
      });
    },
  });