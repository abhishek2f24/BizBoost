import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId } = body;

    const amount = planId === "pro" ? 999900 : 199900; // in paise
    
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if keys are provided
    if (!keyId || !keySecret) {
      console.warn("Razorpay keys missing, returning mock order");
      return NextResponse.json({
        id: "order_mock_" + Math.random().toString(36).slice(2, 9),
        amount: amount,
        currency: "INR",
      });
    }

    const instance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
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
