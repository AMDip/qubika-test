import { Env } from './utils/Environment';
import { test } from './fixture/PomFixture';
import  * as Misc from './utils/Misc'
import { DashboardPage } from '../pages/dashboard/dashboardPage';
import { RequestAPI } from './utils/RequestAPI';
import { LoginPage } from '../pages/login/LoginPage';
import { CategoriesPage } from '../pages/categories/CategoriesPage';
import { expect } from '@playwright/test';

const AUTOMATED_USER = 'AutomatedUser-';
const AUTOMATED_PASS = 'AutomatedPass-';

test.describe('Feature: End 2 End Test', () => {
  test(`Scenario: End 2 end test for ${process.env.ENV} environment`, async ({ loginPage, request }) => {
    let dashboardPage: DashboardPage;
    let categoriesPage: CategoriesPage;
    let requestApi = await new RequestAPI(request);
    let newUser;
    let listOfCategories;
    let email = AUTOMATED_USER + Misc.timestamp() + '@test.com';
    let pass = AUTOMATED_PASS + Misc.timestamp();
    let testCategoryName = 'Test-Category' + Misc.timestamp();
    let testSubCategoryName = 'Test-SubCategory' + Misc.timestamp();


    await test.step('Then I should see the login page', async () => {
        await loginPage.checker.loginFormIsVisible();
        await loginPage.checker.authButtonIsDisabled();
    })
    await test.step('When I create a new user', async () => {
        newUser = await requestApi.registerNewUser(email, pass);
    })
    await test.step('And I type its email and password', async () => {
        await loginPage.typeEmailAndPassword(email, pass);
    })
    await test.step('Then I should see the authenticate button enabled', async () => {
        await loginPage.checker.authButtonIsEnabled();
    })
    await test.step('When I click on the authenticate button', async () => {
        dashboardPage = await loginPage.clickOnAuthButton();
    })
    await test.step('Then I should see the dashboard page visible', async () => {
        await dashboardPage.checker.dashboardPageIsVisible();
    })
    await test.step('When I click on the categories option', async () => {
        categoriesPage = await dashboardPage.clickOnCategoriesOption();
    })
    await test.step('Then I should see the categories page', async () => {
        await categoriesPage.checker.categoriesPageIsVisible();
    })
    await test.step('When I click on the add new category button', async () => {
        await categoriesPage.clickOnAddCategoryButton();
    })
    await test.step('And fill out the required fields', async () => {
        await categoriesPage.fillCategoryNameInput(testCategoryName);
    })
    await test.step('And I click on the accept button', async () => {
        await categoriesPage.clickOnAcceptButton();
    })
    await test.step('Then I should see a successfull message on top of the screen', async () => {
        await categoriesPage.checker.successSnackbarIsVisible();
    })
    await test.step('When I click on the add new category button', async () => {
        await categoriesPage.clickOnAddCategoryButton();
    })
    await test.step('And I fill out all of the sub category required fields', async () => {
        await categoriesPage.fillCategoryNameInput(testSubCategoryName);
        await categoriesPage.clickOnSubCategoryCheck();
        await categoriesPage.clickAndSearchCategoryList(testCategoryName);
    })
    await test.step('And I click on the accept button', async () => {
        await categoriesPage.clickOnAcceptButton();
    })
    await test.step('Then I should see a successfull message on top of the screen', async () => {
        await categoriesPage.checker.successSnackbarIsVisible();
    })
    await test.step('And I verify that the new category shows up on the list', async () => {
        listOfCategories = await requestApi.getListOfCategories();
        let category = listOfCategories.find(cat => cat.name === testCategoryName );
        let subCategoryResult = await requestApi.getSubCategoryByParentId(category.id);
        await expect(subCategoryResult).toBeTruthy();
    })
  });
});