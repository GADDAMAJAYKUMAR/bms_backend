import { AuthRepository }
from "../repositories/auth.repository";

import crypto from "crypto";
import bcrypt from "bcrypt";

import { transporter }
from "../utils/mail";

import { generateToken }
from "../utils/jwt";

export class AuthService {

  private repo =
    new AuthRepository();

  async register(data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber:string;
  }) {

    const existing =
      await this.repo
      .findUserByEmail(
        data.email
      );

    if (existing) {
      throw new Error(
        "Email already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10
      );

    const { confirmPassword, ...userData } = data;
    if (confirmPassword !== data.password) {
      throw new Error('Password confirmation does not match');
    }
    const user = await this.repo.createUser({
      ...userData,
      password: hashedPassword
    });

    const token =
      generateToken(
        user.id,
        user.email,
        user.role
      );

    return {
      user,
      token
    };
  }

  async login(data: {
    email: string;
    password: string;
  }) {

    const user =
      await this.repo
      .findUserByEmail(
        data.email
      );

    if (
      !user ||
      !user.password
    ) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const isMatch =
      await bcrypt.compare(
        data.password,
        user.password
      );

    if (!isMatch) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const token =
      generateToken(
        user.id,
        user.email,
        user.role
      );

    return {
      user,
      token
    };
  }

  async forgotPassword(
      email: string
    ) {

      const user =
        await this.repo
            .findUserByEmail(
            email
            );

        if (!user) {
            throw new Error(
            "User not found"
            );
        }

        const token =
            crypto.randomBytes(32)
            .toString("hex");

        const expiry =
            new Date(
            Date.now()
            + 15 * 60 * 1000
            );

        await this.repo
            .saveResetToken(
            user.id,
            token,
            expiry
            );

        const resetLink =
        `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        await transporter
            .sendMail({
            from:
                process.env.EMAIL_USER,

            to:
                user.email,

            subject:
                "Reset Password",

            html:
                `<h3>Reset Password</h3>
                <a href="${resetLink}">
                Reset Password
                </a>`,
            });

        return {
            message:
            "Reset link sent"
        };
    }

    async resetPassword(
  token: string,
  newPassword: string
) {

  const user =
    await this.repo
    .findUserByResetToken(
      token
    );

  if (
    !user ||
    !user.resetTokenExpiry ||
    user.resetTokenExpiry
      < new Date()
  ) {
    throw new Error(
      "Invalid or expired token"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      10
    );

  await this.repo
    .updatePassword(
      user.id,
      hashedPassword
    );

  return {
    message:
      "Password reset successful"
  };
   }


}