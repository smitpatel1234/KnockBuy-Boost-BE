import jwt from "jsonwebtoken";

import { MYJwtPayload } from "../../domain/models/User.models";
import { ENV } from "../helper/env/index";
import { ApplicationError, ApplicationErrorType } from "./middleware/GlobelErrorHandler";
export const Envvar = {
  JWT_EXPIRESIN: ENV.JWT_EXPIRESIN,
  JWT_SECRET: ENV.JWT_SECRET,
  PassWordSalt: ENV.PassWordSalt,
  REFRESH_TOKEN_EXPIRESIN: ENV.REFRESH_TOKEN_EXPIRESIN,
};
const accessTokengenrator = (payload: MYJwtPayload,) => {
  return jwt.sign(payload, Envvar.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: Envvar.JWT_EXPIRESIN,

  });
};
const refreshTokengenrator = (payload: MYJwtPayload) => {
  return jwt.sign(payload, Envvar.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: Envvar.REFRESH_TOKEN_EXPIRESIN,

  });
};
export const genrateToken = (payload: MYJwtPayload) => {
  try {
    const token = accessTokengenrator(payload);
    const decoded = verifyToken(token);
    const token_refreshToken = refreshTokengenrator(payload);
    return { accessToken: token, expIN: decoded.exp, refreshToken: token_refreshToken };
  }
  catch {
    throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
  }


};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, Envvar.JWT_SECRET) as MYJwtPayload;
    return decoded;
  } catch {
    throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
  }
}
export const decodedToken = (token: string) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch {
    throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
  }
}
export const regenerateToken = (refresh_token: string) => {
  try {
    const decoded = (jwt.verify(
      refresh_token,
      Envvar.JWT_SECRET
    )) as MYJwtPayload;

    const newPayload: Partial<MYJwtPayload> = { ...decoded };
    delete newPayload.exp;
    delete newPayload.iat;

    const newToken = accessTokengenrator(newPayload as MYJwtPayload);

    const decoded1 = (decodedToken(newToken)) as MYJwtPayload;

    return {
      accesstoken: newToken,
      expIN: decoded1.exp
    };
  } catch {
    throw new ApplicationError(
      ApplicationErrorType.UNAUTHORIZED,
      "Unauthorized User"
    );
  }
};