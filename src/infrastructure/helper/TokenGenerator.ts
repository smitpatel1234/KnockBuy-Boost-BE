import jwt from "jsonwebtoken";
import { jwtPayload } from "../../domain/models/User.models";
import { JwtPayload } from "jsonwebtoken";
import { ENV } from "../helper/env/index";
import { User } from "../orm/entities/user";
import { ApplicationError,ApplicationErrorType } from "./middleware/GlobelErrorHandler";
export const Envvar = {
  PassWordSalt: ENV.PassWordSalt,
  JWT_SECRET: ENV.JWT_SECRET,
  JWT_EXPIRESIN: ENV.JWT_EXPIRESIN,
  REFRESH_TOKEN_EXPIRESIN: ENV.REFRESH_TOKEN_EXPIRESIN,
};
const  accessTokengenrator = async (payload: jwtPayload ,) => {
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
  const decoded = await verifyToken(token);

  const token_refreshToken = await refreshTokengenrator(payload);
  return {accessToken: token, refreshToken: token_refreshToken,expIN : decoded.exp};
};

export const verifyToken = async(token: string) => {
  try {
    const decoded = await jwt.verify(token, Envvar.JWT_SECRET ) as jwtPayload ; 
    return decoded;
  } catch (error) {
    throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
  }
}
export const decodedToken = async(token: string) => {
    try {
      const decoded = await jwt.decode(token) ;
      return decoded;
    } catch (error) {
       return new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
    }
}
export const regenerateToken = async(refresh_token: string) => {
    try {
      const decoded = await jwt.verify(refresh_token, Envvar.JWT_SECRET) as jwtPayload;
      const newToken = await accessTokengenrator(decoded);
       const decoded1 = await decodedToken(newToken) as jwtPayload;
       if(!decoded1) throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
      return {accesstoken:newToken, expIN:decoded1.exp };
    } catch (error) {
      throw  new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
    }
}