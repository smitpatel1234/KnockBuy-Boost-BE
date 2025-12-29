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
  SERVER_PORT: loadAsNumber(process.env.PORT) || 5000,
  DB_HOST: loadAsString(process.env.DB_HOST),
  DB_PORT: loadAsNumber(process.env.DB_PORT),
  DB_NAME: loadAsString(process.env.DB_NAME),
  DB_USER: loadAsString(process.env.DB_USERNAME),
  DB_PASSWORD: loadAsString(process.env.DB_PASSWORD),
  DB_TYPE: loadAsString(process.env.DB_TYPE),
  PassWordSalt: loadAsNumber(process.env.saltRounds) || 10,
  JWT_SECRET: loadAsString(process.env.jwt_secret || 'your-super-secret-jwt-key'),
  JWT_EXPIRESIN: loadAsNumber(process.env.jwt_expiresIn),
  REFRESH_TOKEN_EXPIRESIN: loadAsNumber(process.env.refresh_token_expiresIn),
  Client_secret: loadAsString(process.env.Client_secret),
  Client_ID: loadAsString(process.env.Client_ID),
}