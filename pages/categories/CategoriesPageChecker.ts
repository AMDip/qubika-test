import { expect } from '@playwright/test';
import { BasePageChecker } from '../base/BasePageChecker';
import { CategoriesPage } from './CategoriesPage';

export class CategoriesPageChecker extends BasePageChecker {
  readonly page: CategoriesPage;
  readonly WAIT_10_SECONDS: number = 10000;

  constructor(page: CategoriesPage) {
    super(page);
    this.page = page;
  }

  async categoriesPageIsVisible() {
    await expect(this.page.navigationBar).toBeVisible();
    await expect(this.page.addCategoryButton).toBeVisible();
  }

  async successSnackbarIsVisible() {
    await expect(this.page.successSnackbar).toBeVisible({ timeout: this.WAIT_10_SECONDS });
  }
}
