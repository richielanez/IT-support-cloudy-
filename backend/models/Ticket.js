import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    device: { type: String, required: true },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Open", "Pending", "Closed"],
      default: "Open"
    }
  },
  {
    timestamps: true
  }
);

export const Ticket = mongoose.model("Ticket", ticketSchema);
