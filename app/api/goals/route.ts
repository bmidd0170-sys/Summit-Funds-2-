import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ goals: [] });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ goals: [] });
    }

    const goals = await prisma.goal.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ goals });
  } catch (err) {
    console.error("Error fetching goals", err);
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, desc, date, amount } = body ?? {};

  if (!email || !name || !desc || !date || amount === undefined || amount === null) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: body.displayName ?? null,
        password: null,
      },
    });

    const goal = await prisma.goal.create({
      data: {
        name,
        desc,
        date: new Date(date),
        amount: typeof amount === "string" ? parseFloat(amount) : amount,
        userId: user.id,
      },
    });

    return NextResponse.json({ goal }, { status: 201 });
  } catch (err) {
    console.error("Error creating goal", err);
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 });
  }
}
