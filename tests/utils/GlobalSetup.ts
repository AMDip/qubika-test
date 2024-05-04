import dotenv from 'dotenv';

async function globalSetup() {
  if (process.env.ENV) {
    dotenv.config({
      path: `./tests/environments/.env.${process.env.ENV}`,
      override: true,
    });
  }
}
export default globalSetup;
