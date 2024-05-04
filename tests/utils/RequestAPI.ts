import { Env } from './Environment';
import { request, expect } from '@playwright/test';

const BASE_URL = 'https://api.club-administration.qa.qubika.com';
const ROLE = 'ROLE_ADMIN';

export class RequestAPI {
  constructor(request) {
    this.request = request;
  }

  async registerNewUser(email: string, pass: string): Promise<any> {
    //create a new user and return the response
    const response = await this.request.post(`${BASE_URL}/api/auth/register`, {
        data: {
            email: email,
            password: pass,
            ROLE: [ ROLE ]
        },
    });
    await expect(response.status(), 'There was an error registering a new user').toBe(201);
    const responseObject = await response.json();
    return await responseObject;
  }

  async loginWithEmailAndPass(email: string, pass: string): Promise<any> {
    //create a new user and return the response
    const response = await this.request.post(`${BASE_URL}/api/auth/login`, {
        data: {
            email: email,
            password: pass
        },
    });
    console.log(await response.json());
    await expect(response.status(), 'There was an error loggin in the user').toBe(200);
    const responseObject = await response.json();
    return await responseObject.token;
  }

  async getListOfCategories(): Promise<any> {
    //create a new user and return the response
    let token = await this.loginWithEmailAndPass(Env.ADMIN_EMAIL, Env.ADMIN_PASSWORD);
    console.log('TOKEN FROM LOGIN: ' + token);
    const response = await this.request.get(`${BASE_URL}/api/category-type`, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${token}`,
      
        },
    });
    console.log(await response.json());
    await expect(response.status(), 'There was an error getting the list of categories').toBe(200);
    const responseObject = await response.json();
    return await responseObject;
  }

  async getSubCategoryByParentId(parentId: string): Promise<any> {
    //create a new user and return the response
    let token = await this.loginWithEmailAndPass(Env.ADMIN_EMAIL, Env.ADMIN_PASSWORD);
    const response = await this.request.get(`${BASE_URL}/api/category-type/list/${parentId}`, {
        headers: {
            Authorization: `token ${token}`,
      
        },
    });
    console.log(await response.body());
    console.log(await response.json());
    await expect(response.status(), 'There was an error getting the sub category by parentId').toBe(200);
    const responseObject = await response.json();
    return await responseObject;
  }
}
