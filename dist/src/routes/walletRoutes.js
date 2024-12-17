"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletController_1 = require("../controllers/walletController");
const router = express_1.default.Router();
router.get("/", walletController_1.getWallets);
router.post("/", walletController_1.createWallet);
router.put("/:id", walletController_1.updateWallet);
router.delete("/:id", walletController_1.deleteWallet);
exports.default = router; // Use ES module syntax
