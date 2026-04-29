import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
      storeId,
      quantity,
      customerName,
      customerPhone,
      customerEmail,
      address,
    } = body;

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const orderNumber = "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    const order = await prisma.order.create({
      data: {
        storeId,
        orderNumber,
        customerName,
        customerPhone,
        customerEmail,
        address,
        total: product.price * (quantity || 1),
        paymentType: "UPI",
        paymentId: razorpay_payment_id,
        paymentMethod: "Razorpay",
        status: "CONFIRMED",
        items: {
          create: { productId, quantity: quantity || 1, price: product.price },
        },
      },
    });

    return NextResponse.json({ success: true, orderNumber: order.orderNumber });
  } catch (error) {
    console.error("[payments/verify]", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
