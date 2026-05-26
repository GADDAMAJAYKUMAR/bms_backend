import {
  Request,
  Response,
  NextFunction
} from "express";

import jwt from "jsonwebtoken";

export interface AuthRequest
extends Request {
  user?: any;
}

export const authenticate =
(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return res
        .status(401)
        .json({
          success: false,
          error:
            "Unauthorized"
        });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

    req.user = decoded;

    next();

  } catch {

    return res
      .status(401)
      .json({
        success: false,
        error:
          "Invalid token"
      });
  }
};