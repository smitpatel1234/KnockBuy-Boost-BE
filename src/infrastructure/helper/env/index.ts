import dotenv from 'dotenv';
dotenv.config();
const loadAsString = (data: string | undefined ) : string =>{
  if(!data)
    {
          return '';
    }
    return data;
}
const loadAsNumber = (data: string | undefined ) : number =>{
  if(!data)
    {
          return 0;
    }
    return Number(data);
}

export const ENV = {
  SERVER_PORT: loadAsNumber(process.env.PORT),
  DB_HOST: loadAsString(process.env.DB_HOST),
  DB_PORT: loadAsNumber(process.env.DB_PORT),
  DB_NAME: loadAsString(process.env.DB_NAME),
  DB_USER: loadAsString(process.env.DB_USERNAME),
  DB_PASSWORD: loadAsString(process.env.DB_PASSWORD),
  DB_TYPE: loadAsString(process.env.DB_TYPE),
  PassWordSalt: loadAsNumber(process.env.saltRounds),
  JWT_SECRET: loadAsString(process.env.jwt_secret || 'your-super-secret-jwt-key'),
  JWT_EXPIRESIN: loadAsNumber(process.env.jwt_expiresIn || '1h'),
  REFRESH_TOKEN_EXPIRESIN: loadAsNumber(process.env.refresh_token_expiresIn || '7d'),
  Client_secret: loadAsString(process.env.Client_secret),
  Client_ID: loadAsString(process.env.Client_ID),
}