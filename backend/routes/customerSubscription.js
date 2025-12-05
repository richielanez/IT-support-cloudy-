import express from "express";
import Stripe from "stripe";
import { customerAuth } from "../middleware/customerAuth.js";
import { Customer } from "../models/Customer.js";
import { isDemo } from "../middleware/demo.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/customer/subscription/create-checkout
 * body: { plan: "monthly" | "annual" }
 */
router.post(
  "/customer/subscription/create-checkout",
  customerAuth,
  async (req, res) => {
    try {
      const { plan } = req.body;
      if (!plan || !["monthly", "annual"].includes(plan)) {
        return res.status(400).json({ message: "Invalid plan" });
      }

      if (isDemo()) {
        // In demo mode we just simulate a checkout URL
        return res.json({
          demo: true,
          url: `${process.env.FRONTEND_PUBLIC_URL}/portal/subscription?status=demo`,
        });
      }

      const priceId =
        plan === "annual"
          ? process.env.STRIPE_ANNUAL_PRICE_ID
          : process.env.STRIPE_MONTHLY_PRICE_ID;

      const customer = await Customer.findById(req.customer.customerId);
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }

      let stripeCustomerId = customer.stripeCustomerId;
      if (!stripeCustomerId) {
        const stripeCustomer = await stripe.customers.create({
          email: customer.email,
          name: customer.name,
        });
        stripeCustomerId = stripeCustomer.id;
        customer.stripeCustomerId = stripeCustomerId;
        await customer.save();
      }

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: stripeCustomerId,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${process.env.FRONTEND_PUBLIC_URL}/portal/subscription?status=success`,
        cancel_url: `${process.env.FRONTEND_PUBLIC_URL}/portal/subscription?status=cancel`,
        metadata: {
          mongoCustomerId: customer._id.toString(),
          plan,
        },
      });

      return res.json({ url: session.url });
    } catch (err) {
      console.error("Subscription checkout error:", err);
      return res
        .status(500)
        .json({ message: "Failed to create subscription checkout session" });
    }
  }
);

export default router;
