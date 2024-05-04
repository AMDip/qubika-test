import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { DashboardPageChecker } from './DashboardPageChecker';
import { CategoriesPage } from '../categories/CategoriesPage';

export class DashboardPage extends BasePage {
  readonly checker: DashboardPageChecker;

  constructor(page: Page) {
    super(page);
    this.checker = new DashboardPageChecker(this);
  }

  get navigationBar(): Locator {
    return this.page.locator('#sidenav-collapse-main');
  }
  get dashboardOption(): Locator {
    return this.page.locator('.nav-item').getByText('Dashboard');
  }
  get contributionsOption(): Locator {
    return this.page.locator('.nav-item').getByText('Contribuciones');
  }
  get categoriesOption(): Locator {
    return this.page.locator('.nav-item').getByText('Tipos de Categorias ');
  }

  async clickOnCategoriesOption(): Promise<CategoriesPage> {
    await this.categoriesOption.click();
    return await new CategoriesPage(this.page);
  }
}
