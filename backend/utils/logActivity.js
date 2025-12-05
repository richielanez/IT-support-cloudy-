import { CustomerActivity } from "../models/CustomerActivity.js";

/**
 * Safely logs a customer activity event without failing the request.
 * @param {object} req - Express request (can be a minimal shim)
 * @param {string|object} customerId - Mongo ObjectId or string
 * @param {string} type - Activity type
 * @param {object} meta - Optional metadata
 */
export const logActivity = async (req, customerId, type, meta = {}) => {
  try {
    const ip = req.ip || req.headers?.["x-forwarded-for"] || "unknown";
    const userAgent = req.headers?.["user-agent"] || "unknown";

    await CustomerActivity.create({
      customerId,
      type,
      ip,
      userAgent,
      meta,
    });
  } catch (err) {
    // Never crash the app because of logging
    console.error("Activity log error:", err.message);
  }
};
