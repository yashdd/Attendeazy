import express from "express";
import Stripe from "stripe";
import dotenv from 'dotenv';
import Event from "../models/Event.js";
dotenv.config();
const router = express.Router();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",  
});
router.post("/create-session", async (req, res) => {
  try {
    
    console.log("Request body:", req.body);
    const { eventId, quantity } = req.body;

    if (!eventId || !quantity) {
      return res.status(400).json({ message: "Missing eventId or quantity" });
    }

    // 1. Fetch event from DB
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 2. Prepare price and title
    const priceInCents = Math.round(Number(event.price) * 100);
    if (isNaN(priceInCents) || priceInCents <= 0) {
      return res.status(400).json({ message: "Invalid event price" });
    }

    // 3. Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: event.title,
            },
            unit_amount: priceInCents,
          },
          quantity,
        },
      ],
      success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/users/dashboard/my-tickets?session_id={CHECKOUT_SESSION_ID}&eventId=${event._id}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/events/${event._id}`,
    });

    console.log("Stripe session created:", session.id);
    res.json({ url: session.url });

  } catch (err) {
  
    
    console.error("Stripe session error:", err);
    res.status(500).json({ message: "Failed to create Stripe session" });
  }
});

export default router;
