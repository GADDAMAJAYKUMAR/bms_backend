import passport from "passport";

import {
  Strategy as GoogleStrategy
} from "passport-google-oauth20";

import prisma
from "./prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env
          .GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env
          .GOOGLE_CLIENT_SECRET!,

      callbackURL:
        process.env
          .GOOGLE_CALLBACK_URL!,
    },

    async (
      _accessToken,
      _refreshToken,
      profile,
      done
    ) => {

      try {

        let user =
          await prisma.user
          .findUnique({
            where: {
              email:
                profile.emails?.[0]
                ?.value
            }
          });

        if (!user) {

          user =
          await prisma.user
          .create({
            data: {
              fullName:
                profile.displayName,

              email:
                profile.emails?.[0]
                ?.value!,

              profilePicture:
                profile.photos?.[0]
                ?.value,

              authProvider:
                "GOOGLE",

              providerId:
                profile.id,

              isEmailVerified:
                true,
            }
          });
        }

        return done(
          null,
          user
        );

      } catch (error) {

        return done(
          error,
          false
        );
      }
    }
  )
);

export default passport;