import dotenv from 'dotenv';
dotenv.config();
const loadAsString = (data: string | undefined): string => {
  if (!data) {
    return '';
  }
  return data;
}
const loadAsNumber = (data: string | undefined): number => {
  if (!data) {
    return 0;
  }
  return Number(data);
}

export const ENV = {
  Client_ID: loadAsString(process.env.Client_ID),
  Client_secret: loadAsString(process.env.Client_secret),
  COMPANY_NAME: loadAsString(process.env.COMPANY_NAME),
  DB_HOST: loadAsString(process.env.DB_HOST),
  DB_NAME: loadAsString(process.env.DB_NAME),
  DB_PASSWORD: loadAsString(process.env.DB_PASSWORD),
  DB_PORT: loadAsNumber(process.env.DB_PORT),
  DB_TYPE: loadAsString(process.env.DB_TYPE),
  DB_USER: loadAsString(process.env.DB_USERNAME),
  EMAIL_PASSWORD: loadAsString(process.env.EMAIL_PASSWORD),
  JWT_EXPIRESIN: loadAsNumber(process.env.jwt_expiresIn),
  JWT_SECRET: loadAsString(process.env.jwt_secret),
  MAIL_SERVICE: loadAsString(process.env.MAIL_SERVICE),
  PassWordSalt: loadAsNumber(process.env.saltRounds),
  RECAPTCHA_SECRET_KEY: loadAsString(process.env.RECAPTCHA_SECRET_KEY),
  REFRESH_TOKEN_EXPIRESIN: loadAsNumber(process.env.refresh_token_expiresIn),
  SERVER_PORT: loadAsNumber(process.env.PORT),
  SMTP_HOST: loadAsString(process.env.SMTP_HOST),
  USER_EMAIL: loadAsString(process.env.USER_EMAIL),
}