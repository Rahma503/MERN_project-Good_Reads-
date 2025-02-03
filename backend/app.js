import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js"; // ✅ Add .js extension
import orderRoutes from "./routes/orderRoutes.js"; // ✅ Add .js extension

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
