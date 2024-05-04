import { expect } from '@playwright/test';
import { BasePageChecker } from '../base/BasePageChecker';
import { DashboardPage } from './dashboardPage';

export class DashboardPageChecker extends BasePageChecker {
  readonly page: DashboardPage;
  readonly WAIT_10_SECONDS: number = 10000;

  constructor(page: DashboardPage) {
    super(page);
    this.page = page;
  }

  async dashboardPageIsVisible() {
    await expect(this.page.navigationBar).toBeVisible();
    await expect(this.page.dashboardOption).toBeVisible();
  }
}
