import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkIsAdmin } from "@/lib/checkAdmin";

// GET /api/logins — fetch recent login history
export async function GET(req: NextRequest) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") || "30", 10);
        const studentId = searchParams.get("studentId");

        const whereClause: any = {};
        if (studentId) {
            whereClause.userId = studentId;
        }

        const logins = await prisma.loginLog.findMany({
            where: whereClause,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        instrument: true,
                    },
                },
            },
        });

        return NextResponse.json(logins);
    } catch (error) {
        console.error("Error fetching login logs:", error);
        return NextResponse.json({ error: "Fehler beim Laden der Login-Historie" }, { status: 500 });
    }
}
