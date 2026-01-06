import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
    const { budgetName, budgetAmount, goals, financialProfile } = await req.json();
    // Compose a readable summary of the financial profile
    let profileSummary = '';
    if (financialProfile) {
        profileSummary = Object.entries(financialProfile)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
    }
    const prompt = `I am creating a budget plan called "${budgetName}" with an amount of $${budgetAmount}. My financial profile is: ${profileSummary || 'not provided'}. My current goals are: ${goals.map((g: any) => `${g.name} ($${g.amount} by ${g.date})`).join(', ') || 'none'}. Give me helpful, concise financial tips or suggestions for this budget plan.`;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful financial assistant.' },
                { role: 'user', content: prompt },
            ],
            max_tokens: 120,
        });
        const suggestion = completion.choices[0]?.message?.content || 'No suggestion available.';
        return NextResponse.json({ suggestion });
    } catch (error) {
        return NextResponse.json({ suggestion: 'Error generating suggestion.' }, { status: 500 });
    }
}
