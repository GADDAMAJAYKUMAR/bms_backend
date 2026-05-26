import { Router } from "express";
import { BatteryController } from "../controllers/battery.controller";

const router = Router();
const controller = new BatteryController();

// Chemistry Routes
router.get("/chemistries", controller.getChemistries.bind(controller));
router.get("/chemistries/:id", controller.getChemistryById.bind(controller));
router.post("/chemistries", controller.createChemistry.bind(controller));
router.put("/chemistries/:id", controller.updateChemistry.bind(controller));
router.delete("/chemistries/:id", controller.deleteChemistry.bind(controller));

// Configuration Routes
router.get("/configs", controller.getConfigs.bind(controller));
router.get("/configs/:id", controller.getConfigById.bind(controller));
router.post("/configs", controller.createConfig.bind(controller));
router.put("/configs/:id", controller.updateConfig.bind(controller));
router.delete("/configs/:id", controller.deleteConfig.bind(controller));

// Backward-compatible Root Routes
router.get("/", controller.getAll.bind(controller));
router.post("/", controller.create.bind(controller));

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy 🚀",
    timestamp: new Date().toISOString()
  });
});

export default router;