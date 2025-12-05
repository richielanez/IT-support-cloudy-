import express from "express";
import Invoice from "../models/Invoice.js";
import { Customer } from "../models/Customer.js";
import { customerAuth } from "../middleware/customerAuth.js";
import { createStatementPDF } from "../utils/statementPdf.js";
import { isDemo } from "../middleware/demo.js";
import { demoUser, demoInvoices } from "../utils/demoData.js";

const router = express.Router();

/**
 * GET /api/customer/statements/:year/:month
 * Download a monthly statement PDF for the logged‑in customer.
 */
router.get(
  "/customer/statements/:year/:month",
  customerAuth,
  async (req, res) => {
    try {
      const year = Number(req.params.year);
      const month = Number(req.params.month); // 1–12

      if (!year || !month || month < 1 || month > 12) {
        return res.status(400).json({ message: "Invalid year or month" });
      }

      if (isDemo()) {
        const pdfPath = await createStatementPDF(
          demoUser,
          demoInvoices,
          year,
          month
        );
        return res.download(pdfPath);
      }

      const from = new Date(year, month - 1, 1);
      const to = new Date(year, month, 1);

      const customer = await Customer.findById(req.customer.customerId);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      const invoices = await Invoice.find({
        customerEmail: customer.email,
        createdAt: { $gte: from, $lt: to },
      }).sort({ createdAt: 1 });

      const pdfPath = await createStatementPDF(
        customer,
        invoices,
        year,
        month
      );

      return res.download(pdfPath);
    } catch (err) {
      console.error("Statement error:", err);
      return res.status(500).json({ message: "Failed to generate statement" });
    }
  }
);

export default router;
