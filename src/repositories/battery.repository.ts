import prisma from "../config/prisma";
import { Prisma } from "@prisma/client";

export class BatteryRepository {
  async createChemistry(data: Prisma.BatteryChemistryCreateInput) {
    return prisma.batteryChemistry.create({
      data,
    });
  }

  async findChemistryById(id: string) {
    return prisma.batteryChemistry.findUnique({
      where: { id },
    });
  }

  async findChemistryByName(chemistryName: string) {
    return prisma.batteryChemistry.findUnique({
      where: { chemistryName },
    });
  }

  async findAllChemistries() {
    return prisma.batteryChemistry.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async updateChemistry(id: string, data: Prisma.BatteryChemistryUpdateInput) {
    return prisma.batteryChemistry.update({
      where: { id },
      data,
    });
  }

  async deleteChemistry(id: string) {
    return prisma.batteryChemistry.delete({
      where: { id },
    });
  }

  async createConfig(data: Prisma.ChemistryConfigUncheckedCreateInput) {
    return prisma.chemistryConfig.create({
      data,
      include: { chemistry: true },
    });
  }

  async findConfigById(id: string) {
    return prisma.chemistryConfig.findUnique({
      where: { id },
      include: { chemistry: true },
    });
  }

  async findAllConfigs(filters: { chemistryId?: string; vehicleModel?: string; isActive?: boolean }) {
    const where: Prisma.ChemistryConfigWhereInput = {};

    if (filters.chemistryId) {
      where.chemistryId = filters.chemistryId;
    }

    if (filters.vehicleModel) {
      where.vehicleModel = { contains: filters.vehicleModel, mode: "insensitive" };
    }

    if (typeof filters.isActive === "boolean") {
      where.isActive = filters.isActive;
    }

    return prisma.chemistryConfig.findMany({
      where,
      include: { chemistry: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateConfig(id: string, data: Prisma.ChemistryConfigUpdateInput) {
    return prisma.chemistryConfig.update({
      where: { id },
      data,
      include: { chemistry: true },
    });
  }

  async deleteConfig(id: string) {
    return prisma.chemistryConfig.delete({
      where: { id },
    });
  }
}
    