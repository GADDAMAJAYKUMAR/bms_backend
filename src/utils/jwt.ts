import jwt from "jsonwebtoken";

export const generateToken = (
  id: string,
  email: string,
  role: string
) => {
  return jwt.sign(
    {
      id,
      email,
      role
    },
    process.env.JWT_SECRET!,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN
    }
  );
};