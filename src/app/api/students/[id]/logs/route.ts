import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const logs = await prisma.lessonLog.findMany({
            where: {
                studentId: id,
            },
            orderBy: {
                date: "desc",
            },
        });

        return NextResponse.json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
