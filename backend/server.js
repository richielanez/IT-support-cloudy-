import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import authRoutes from "./routes/auth.js";
import ticketRoutes from "./routes/tickets.js";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: false
  })
);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Cloudy IT Support API is running" });
});

// Routes
app.use("/api/auth", authRoutes);

// Tickets: public create, admin read/update (protected)
app.post("/api/tickets", ticketRoutes); // create is defined as POST "/" in router

// For protected routes, apply auth middleware
app.use("/api/tickets", authMiddleware, ticketRoutes);
app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({ email: req.user.email });
});

// Start
const startServer = async () => {
  await connectDB();

  // Seed admin if not exists
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await User.create({ email: adminEmail, passwordHash });
      console.log("✅ Admin user created:", adminEmail);
    } else {
      console.log("ℹ️ Admin user already exists:", adminEmail);
    }
  } else {
    console.warn("⚠️ ADMIN_EMAIL / ADMIN_PASSWORD not set, no admin seeded.");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});
