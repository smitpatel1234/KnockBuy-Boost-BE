import jwt from "jsonwebtoken";

import { jwtPayload } from "../../domain/models/User.models";
import { ENV } from "../helper/env/index";
import { ApplicationError, ApplicationErrorType } from "./middleware/GlobelErrorHandler";
export const Envvar = {
  JWT_EXPIRESIN: ENV.JWT_EXPIRESIN,
  JWT_SECRET: ENV.JWT_SECRET,
  PassWordSalt: ENV.PassWordSalt,
  REFRESH_TOKEN_EXPIRESIN: ENV.REFRESH_TOKEN_EXPIRESIN,
};
const accessTokengenrator = async (payload: jwtPayload,) => {
  return jwt.sign(payload, Envvar.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: Envvar.JWT_EXPIRESIN,

  });
};
const refreshTokengenrator = async (payload: jwtPayload) => {
  return jwt.sign(payload, Envvar.JWT_SECRET, {
    algorithm: 'HS512',
    expiresIn: Envvar.REFRESH_TOKEN_EXPIRESIN,

  });
};
export const genrateToken = async (payload: jwtPayload) => {
  const token = await accessTokengenrator(payload);
  const decoded = await verifyToken(token);

  const token_refreshToken = await refreshTokengenrator(payload);
  return { accessToken: token, expIN: decoded.exp, refreshToken: token_refreshToken };
};

export const verifyToken = async (token: string) => {
  try {
    const decoded =  jwt.verify(token, Envvar.JWT_SECRET) as jwtPayload;
    return decoded;
  } catch  {
    throw new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
  }
}
export const decodedToken = async (token: string) => {
  try {
    const decoded =  jwt.decode(token);
    return decoded;
  } catch  {
    return new ApplicationError(ApplicationErrorType.UNAUTHORIZED, "Unauthorized User");
  }
}
export const regenerateToken = async (refresh_token: string) => {
  try {
    const decoded = ( jwt.verify(
      refresh_token,
      Envvar.JWT_SECRET
    )) as jwtPayload;

    const { exp, iat, ...newPayload } = decoded;

    const newToken = await accessTokengenrator(newPayload as jwtPayload);

    const decoded1 = (await decodedToken(newToken)) as jwtPayload;
    if (!decoded1)
      throw new ApplicationError(
        ApplicationErrorType.UNAUTHORIZED,
        "Unauthorized User"
      );

    return {
      accesstoken: newToken,
      expIN: decoded1.exp
    };
  } catch  {
    throw new ApplicationError(
      ApplicationErrorType.UNAUTHORIZED,
      "Unauthorized User"
    );
  }
};