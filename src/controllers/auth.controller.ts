import {
  Request,
  Response,
  NextFunction
} from "express";

import {
  generateToken
} from "../utils/jwt";
import { AuthService }
from "../services/auth.service";

const service =
new AuthService();

export class AuthController {

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const data =
        await service
        .register(req.body);

      res.status(201)
      .json({
        success: true,
        data
      });

    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const data =
        await service
        .login(req.body);

      res.status(200)
      .json({
        success: true,
        data
      });

    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const data =
        await service
        .forgotPassword(
          req.body.email
        );

      res.json({
        success: true,
        data
      });

    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const data =
        await service
        .resetPassword(
          req.body.token,
          req.body.password
        );

      res.json({
        success: true,
        data
      });

    } catch (error) {
      next(error);
    }
  }
  googleCallback(
  req: any,
  res: any
) {

  const token =
    generateToken(
      req.user.id,
      req.user.email,
      req.user.role
    );

  res.redirect(
`${process.env.FRONTEND_URL}/login?token=${token}`
  );
}

  microsoftCallback(req: any, res: any) {
    const token = generateToken(
      req.user.id,
      req.user.email,
      req.user.role
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/login?token=${token}`
    );
  }
}