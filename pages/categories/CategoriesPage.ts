import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { CategoriesPageChecker } from './CategoriesPageChecker';

export class CategoriesPage extends BasePage {
  readonly checker: CategoriesPageChecker;

  constructor(page: Page) {
    super(page);
    this.checker = new CategoriesPageChecker(this);
  }

  get navigationBar(): Locator {
    return this.page.locator('#sidenav-collapse-main');
  }
  get addCategoryButton(): Locator {
    return this.page.getByRole('button', {name: 'Adicionar'});
  }
  get categoryNameInput(): Locator {
    return this.page.getByPlaceholder('Nombre de categoría');
  }
  get acceptButton(): Locator {
    return this.page.getByRole('button', {name: 'Aceptar'});
  }
  get isSubCategoryCheck(): Locator {
    return this.page.getByText('Es subcategoria?');
  }
  get parentCategoryList(): Locator {
    return this.page.getByPlaceholder('Seleccione la categoría padre').locator('input');
  }
  get parentCategoryOptions(): Locator {
    return this.page.locator('.ng-option');
  }
  get successSnackbar(): Locator {
    return this.page.getByText('Tipo de categoría adicionada satisfactoriamente');
  }

  async clickOnAddCategoryButton() {
    await this.addCategoryButton.click();
  }

  async clickOnAcceptButton() {
    await this.acceptButton.click();
  }

  async clickOnSubCategoryCheck() {
    await this.isSubCategoryCheck.click();
  }

  async clickAndSearchCategoryList(category: string) {
    await this.parentCategoryList.click();
    await this.parentCategoryOptions.getByText(category).click();
  }

  async fillCategoryNameInput(name: string) {
    await this.categoryNameInput.fill(name);
  }
}
