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
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: "Failed to fetch goals", details: message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, name, desc, date, amount } = body ?? {};

    if (!email || !name || !desc || !date || amount === undefined || amount === null) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const parsedDate = new Date(date);
        if (Number.isNaN(parsedDate.getTime())) {
            return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
        }

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

        const goal = await prisma.goal.create({
            data: {
                name,
                desc,
                date: parsedDate,
                amount: numericAmount,
                userId: user.id,
            },
        });

        return NextResponse.json({ goal }, { status: 201 });
    } catch (err) {
        console.error("Error creating goal", err);
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: "Failed to create goal", details: message }, { status: 500 });
    }
}
