import { expect } from '@playwright/test';
import { BasePageChecker } from '../base/BasePageChecker';
import { LoginPage } from './LoginPage';

export class LoginPageChecker extends BasePageChecker {
  readonly page: LoginPage;
  readonly WAIT_10_SECONDS: number = 10000;

  constructor(page: LoginPage) {
    super(page);
    this.page = page;
  }

  async loginFormIsVisible() {
    await expect(this.page.userNameInput).toBeVisible({ timeout: this.WAIT_10_SECONDS });
    await expect(this.page.passwordInput).toBeVisible({ timeout: this.WAIT_10_SECONDS });
  }

  async authButtonIsEnabled() {
    await expect(this.page.authButton).toBeEnabled();
  }

  async authButtonIsDisabled() {
    await expect(this.page.authButton).toBeDisabled();
  }
}
