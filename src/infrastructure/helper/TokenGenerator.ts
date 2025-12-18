import jwt from "jsonwebtoken";
import { jwtPayload } from "../../domain/models/User.models";
import { ENV } from "../helper/env/index";
import { User } from "../orm/entities/user";
export const Envvar = {
  PassWordSalt: ENV.PassWordSalt,
  JWT_SECRET: ENV.JWT_SECRET,
  JWT_EXPIRESIN: ENV.JWT_EXPIRESIN,
  REFRESH_TOKEN_EXPIRESIN: ENV.REFRESH_TOKEN_EXPIRESIN,
};
const  accessTokengenrator = async (payload: jwtPayload) => {
    return await jwt.sign(payload, Envvar.JWT_SECRET, {
      algorithm: 'HS512',
      expiresIn:Envvar.JWT_EXPIRESIN ,

    });
};
const refreshTokengenrator = async (payload: jwtPayload) => {
    return await jwt.sign(payload, Envvar.JWT_SECRET, {
      algorithm: 'HS512',
      expiresIn:Envvar.REFRESH_TOKEN_EXPIRESIN ,

    });
  };
export const genrateToken = async(payload: jwtPayload) => {
  const token = await accessTokengenrator(payload);
  const token_refreshToken = await refreshTokengenrator(payload);
  return {accessToken: token, refreshToken: token_refreshToken};
};

export const verifyToken = async(token: string) => {
  try {
    const decoded = await jwt.verify(token, Envvar.JWT_SECRET ) as jwtPayload; 
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export const regenerateToken = async(refresh_token: string) => {
    try {
      const decoded = await jwt.verify(refresh_token, Envvar.JWT_SECRET) as jwtPayload;
       
      const newToken = await accessTokengenrator(decoded);
      return newToken;
    } catch (error) {
      throw new Error('Invalid token');
    }
}