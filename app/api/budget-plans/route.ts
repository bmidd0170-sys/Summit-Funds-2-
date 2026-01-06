import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
        return NextResponse.json({ budgetPlans: [] });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ budgetPlans: [] });
        }

        const budgetPlans = await prisma.budgetPlan.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ budgetPlans });
    } catch (err) {
        console.error("Error fetching budget plans", err);
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: "Failed to fetch budget plans", details: message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, name, amount } = body ?? {};

    if (!email || !name || amount === undefined || amount === null) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
        if (typeof numericAmount !== "number" || !Number.isFinite(numericAmount)) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email,
                name: body.displayName ?? null,
                password: null,
            },
        });

        const budgetPlan = await prisma.budgetPlan.create({
            data: {
                name,
                amount: numericAmount,
                userId: user.id,
            },
        });

        return NextResponse.json({ budgetPlan }, { status: 201 });
    } catch (err) {
        console.error("Error creating budget plan", err);
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: "Failed to create budget plan", details: message }, { status: 500 });
    }
}
