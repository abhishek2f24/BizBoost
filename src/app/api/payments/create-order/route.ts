import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId } = body;

    const amount = planId === "pro" ? 999900 : 199900; // in paise
    
    // Check if keys are provided
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.warn("Razorpay keys missing, returning mock order");
      return NextResponse.json({
        id: "order_mock_" + Math.random().toString(36).slice(2, 9),
        amount: amount,
        currency: "INR",
      });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).slice(2, 9),
    };

    const order = await instance.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("[payments/create-order]", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
