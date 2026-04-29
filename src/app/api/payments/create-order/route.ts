import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const schema = z.object({
  amount: z.number().positive(),
  currency: z.string().default("INR"),
  productName: z.string(),
  storeId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

    const { amount, currency, productName, storeId } = parsed.data;

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency,
      receipt: `rcpt_${Date.now()}`,
      notes: { productName, storeId },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[payments/create-order]", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}
