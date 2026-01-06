require("ts-node/register");
const { PrismaClient } = require("../app/generated/prisma/client");

const prisma = new PrismaClient();

async function main() {
    // Create a demo user (id auto-generated, email unique)
    const user = await prisma.user.upsert({
        where: { email: "john.doe@example.com" },
        update: {},
        create: {
            email: "john.doe@example.com",
            name: "John Doe",
            password: null,
        },
    });

    // Create a couple of goals for this user
    await prisma.goal.createMany({
        data: [
            {
                name: "Emergency Fund",
                desc: "Save for 3 months of expenses",
                date: new Date("2026-12-31"),
                amount: 3000,
                userId: user.id,
            },
            {
                name: "Vacation",
                desc: "Trip to the beach",
                date: new Date("2026-08-01"),
                amount: 1500,
                userId: user.id,
            },
        ],
        skipDuplicates: true,
    });

    // Create a sample budget plan
    await prisma.budgetPlan.create({
        data: {
            name: "Monthly Budget",
            amount: 2500,
            userId: user.id,
        },
    });

    console.log("Database seeded successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
