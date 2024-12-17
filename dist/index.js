"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const walletRoutes_1 = __importDefault(require("./src/routes/walletRoutes"));
const transactionRoutes_1 = __importDefault(require("./src/routes/transactionRoutes"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the backend API!");
});
// API Routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/wallets", walletRoutes_1.default);
app.use("/api/transactions", transactionRoutes_1.default);
// Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
