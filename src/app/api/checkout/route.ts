import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { productId, storeId, customerDetails } = await req.json();

    if (!productId || !storeId || !customerDetails.name || !customerDetails.phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Try to find the product
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    const price = product?.price || 4999; // Fallback for mock demo items

    const orderNumber = "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    // Create the order
    const order = await prisma.order.create({
      data: {
        storeId,
        orderNumber,
        customerName: customerDetails.name,
        customerPhone: customerDetails.phone,
        address: customerDetails.address,
        total: price,
        paymentType: "COD",
        status: "PENDING",
        items: {
          create: {
            productId,
            quantity: 1,
            price: price
          }
        }
      }
    });

    return NextResponse.json({ success: true, orderId: order.orderNumber });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
