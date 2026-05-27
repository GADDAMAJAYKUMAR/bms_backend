import prisma from "../config/prisma";

export class AuthRepository {

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  // Updated to accept phoneNumber and acceptedTerms; confirmPassword is omitted intentionally
  async createUser(data: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    acceptedTerms?: boolean;
  }) {
    return prisma.user.create({
      data
    });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async saveResetToken(
  userId: string,
  token: string,
  expiry: Date
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      resetToken: token,
      resetTokenExpiry: expiry
    }
  });
}

async findUserByResetToken(
  token: string
) {
  return prisma.user.findFirst({
    where: {
      resetToken: token
    }
  });
}

async updatePassword(
  userId: string,
  password: string
) {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password,
      resetToken: null,
      resetTokenExpiry: null
    }
  });
}

async updateLoginAttempts(
  userId: string,
  attempts: number
) {

  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      loginAttempts: attempts
    }
  });

}

async lockUser(
  userId: string,
  lockUntil: Date
) {

  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      lockUntil,
      loginAttempts: 0
    }
  });

}

async resetLoginAttempts(
  userId: string
) {

  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      loginAttempts: 0,
      lockUntil: null
    }
  });

}

}