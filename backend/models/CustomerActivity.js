import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "login_success",
        "login_failed",
        "password_reset_request",
        "password_changed",
        "twofa_sent",
        "twofa_failed",
        "twofa_verified",
        "profile_updated",
        "subscription_changed",
        "statement_download",
        "invoice_paid",
      ],
      required: true,
    },
    ip: String,
    userAgent: String,
    meta: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const CustomerActivity = mongoose.model(
  "CustomerActivity",
  activitySchema
);
