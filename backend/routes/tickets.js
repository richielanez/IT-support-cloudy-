import express from "express";
import { Ticket } from "../models/Ticket.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Create Nodemailer transporter (re-used)
const createTransporter = () => {
  if (!process.env.SMTP_HOST) {
    console.warn("⚠️ SMTP not configured; email notifications disabled.");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// PUBLIC: create ticket
router.post("/", async (req, res) => {
  try {
    const { name, email, device, priority, subject, description } = req.body;

    if (!name || !email || !device || !priority || !subject || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.create({
      name,
      email,
      device,
      priority,
      subject,
      description
    });

    // Send notification email if SMTP configured
    const transporter = createTransporter();
    if (transporter) {
      try {
        const notifyEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;

        await transporter.sendMail({
          from: `Cloudy IT Support <${process.env.SMTP_USER}>`,
          to: notifyEmail,
          subject: `New Support Ticket #${ticket._id} – ${ticket.subject}`,
          text: `
A new support ticket has been created.

Name: ${ticket.name}
Email: ${ticket.email}
Device: ${ticket.device}
Priority: ${ticket.priority}
Subject: ${ticket.subject}
Description:
${ticket.description}

Status: ${ticket.status}
Created at: ${ticket.createdAt}
          `.trim()
        });

        // Confirmation email to customer (optional)
        await transporter.sendMail({
          from: `Cloudy IT Support <${process.env.SMTP_USER}>`,
          to: ticket.email,
          subject: `Cloudy IT Support – Ticket #${ticket._id} received`,
          text: `
Hi ${ticket.name},

Thanks for reaching out to Cloudy IT Support.

We have received your ticket:
Subject: ${ticket.subject}
Priority: ${ticket.priority}
Status: ${ticket.status}

We will get back to you as soon as possible.

Best regards,
Cloudy IT Support
          `.trim()
        });
      } catch (emailErr) {
        console.warn("Email send error:", emailErr.message);
      }
    }

    res.status(201).json(ticket);
  } catch (err) {
    console.error("Create ticket error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN: get all tickets
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && ["Open", "Pending", "Closed"].includes(status)) {
      filter.status = status;
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error("Get tickets error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN: change status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Open", "Pending", "Closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    console.error("Update status error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
