import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String, // User placing the order
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

export default Order; // Use export default instead of module.exports
