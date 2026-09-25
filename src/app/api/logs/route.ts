import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkIsAdmin } from "@/lib/checkAdmin";

// GET /api/logs — fetch lesson journal entries
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get("studentId");

        const whereClause: any = {};
        if (studentId) {
            whereClause.studentId = studentId;
        }

        const logs = await prisma.lessonLog.findMany({
            where: whereClause,
            orderBy: { date: "desc" },
            include: {
                student: {
                    select: { id: true, name: true, email: true, instrument: true },
                },
            },
        });

        return NextResponse.json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json({ error: "Fehler beim Laden des Journals" }, { status: 500 });
    }
}

// POST /api/logs — create a lesson journal entry
export async function POST(req: NextRequest) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { studentId, date, status, topic, homework, notes } = body;

        if (!studentId) {
            return NextResponse.json({ error: "Schüler muss ausgewählt werden" }, { status: 400 });
        }

        const log = await prisma.lessonLog.create({
            data: {
                studentId,
                date: date ? new Date(date) : new Date(),
                status: status || "PRESENT",
                topic: topic || null,
                homework: homework || null,
                notes: notes || null,
            },
            include: {
                student: {
                    select: { id: true, name: true, email: true, instrument: true },
                },
            },
        });

        return NextResponse.json(log, { status: 201 });
    } catch (error) {
        console.error("Error creating lesson log:", error);
        return NextResponse.json({ error: "Fehler beim Erstellen des Eintrags" }, { status: 500 });
    }
}

// DELETE /api/logs — delete a lesson log
export async function DELETE(req: NextRequest) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id } = body;
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

        await prisma.lessonLog.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting log:", error);
        return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
    }
}
