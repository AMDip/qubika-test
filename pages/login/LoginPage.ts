import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { LoginPageChecker } from './LoginPageChecker';
import { DashboardPage } from '../dashboard/dashboardPage';

export class LoginPage extends BasePage {
  readonly checker: LoginPageChecker;

  constructor(page: Page) {
    super(page);
    this.checker = new LoginPageChecker(this);
  }

  get authButton(): Locator {
    return this.page.getByRole('button', {name: 'Autenticar'} );
  }
  get userNameInput(): Locator {
    return this.page.getByPlaceholder('Usuario o correo electrónico');
  }
  get passwordInput(): Locator {
    return this.page.getByPlaceholder('Contraseña');
  }

  async clickOnAuthButton(): Promise<DashboardPage> {
    await this.authButton.click();
    return await new DashboardPage(this.page);
  }

  async typeEmailAndPassword(email: string, password: string) {
    await this.userNameInput.fill(email);
    await this.passwordInput.fill(password);
  }
}
