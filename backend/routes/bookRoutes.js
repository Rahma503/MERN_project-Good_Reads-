import { Router } from "express";
const router = Router();
import Book from "../models/book.js";

router.get("/", async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;


