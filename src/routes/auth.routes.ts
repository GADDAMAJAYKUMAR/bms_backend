import { Router }
from "express";

import { AuthController }
from "../controllers/auth.controller";
import passport
from "passport";

const router =
Router();

const controller =
new AuthController();

router.post(
  "/register",
  controller.register
  .bind(controller)
);

router.post(
  "/login",
  controller.login
  .bind(controller)
);

router.post(
  "/forgot-password",
  controller
   .forgotPassword
   .bind(controller)
);

router.post(
  "/reset-password",
  controller
   .resetPassword
   .bind(controller)
);
router.get(
  "/google",

  passport.authenticate(
    "google",
    {
      scope: [
        "profile",
        "email"
      ]
    }
  )
);

router.get(
  "/google/callback",

  passport.authenticate(
    "google",
    {
      session: false
    }
  ),

  controller.googleCallback
  .bind(controller)
);

router.get("/microsoft", passport.authenticate("azuread-openidconnect", {
  scope: ["profile", "email"]
}));

router.get("/microsoft/callback", passport.authenticate("azuread-openidconnect", {
  session: false
}),
controller.microsoftCallback.bind(controller));

export default router;