import passport from "passport";
import { OIDCStrategy } from "passport-azure-ad";
import prisma from "./prisma";

passport.use(
  new OIDCStrategy(
    {
      identityMetadata:
        "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",

      clientID:
        process.env.MICROSOFT_CLIENT_ID!,

      clientSecret:
        process.env.MICROSOFT_CLIENT_SECRET!,

      responseType: "code",

      responseMode: "query",

      redirectUrl:
        process.env.MICROSOFT_CALLBACK_URL!,

      allowHttpForRedirectUrl: true,

      validateIssuer: false,

      passReqToCallback: false,

      scope: ["profile", "email", "openid"]
    },

    async (
      iss,
      sub,
      profile,
      accessToken,
      refreshToken,
      done
    ) => {

      try {

        let email =
          profile._json?.preferred_username ||
          profile._json?.email;

        let user =
          await prisma.user.findUnique({
            where: { email }
          });

        if (!user) {

          user =
            await prisma.user.create({
              data: {
                fullName:
                  profile.displayName ||
                  "Microsoft User",

                email,

                authProvider:
                  "MICROSOFT",

                providerId:
                  profile.oid,

                isEmailVerified:
                  true
              }
            });
        }

        return done(null, user);

      } catch (err) {

        return done(err, false);

      }
    }
  )
);