import { Router } from "express";
const router = Router();
import Order from "../models/order.js";


// Example route: Get all orders
router.get("/", async (req, res) => {
    try {
      const books = await Order.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


export default router;
