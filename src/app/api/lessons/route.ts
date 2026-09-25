import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkIsAdmin } from "@/lib/checkAdmin";

// GET /api/lessons — fetch lessons (optionally filtered by studentId or for portal)
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get("studentId");

        const whereClause: any = {};
        if (studentId) {
            // Student view: show lessons assigned to this student OR marked as global
            whereClause.OR = [
                { isGlobal: true },
                { studentId: studentId },
            ];
        }

        const lessons = await prisma.lesson.findMany({
            where: whereClause,
            orderBy: [{ createdAt: "desc" }],
            include: {
                materials: {
                    orderBy: { createdAt: "asc" },
                },
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json(
            lessons.map((l) => ({
                id: l.id,
                title: l.title,
                description: l.description || "",
                notes: l.notes || "",
                instrument: l.instrument || "Schlagzeug",
                isGlobal: l.isGlobal,
                studentId: l.studentId,
                studentName: l.student?.name || (l.isGlobal ? "Alle Schüler" : "Keine Zuweisung"),
                createdAt: l.createdAt,
                files: l.materials.map((m) => ({
                    id: m.id,
                    name: m.title,
                    category: m.category,
                    source: m.source,
                    url: m.fileUrl,
                    size: m.size,
                })),
            }))
        );
    } catch (error) {
        console.error("Error fetching lessons:", error);
        return NextResponse.json({ error: "Fehler beim Laden der Lektionen" }, { status: 500 });
    }
}

// POST /api/lessons — create a new lesson
export async function POST(req: NextRequest) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, description, notes, instrument, isGlobal, studentId } = body;

        if (!title) {
            return NextResponse.json({ error: "Titel ist ein Pflichtfeld" }, { status: 400 });
        }

        const effectiveStudentId = studentId && studentId !== "ALL" ? studentId : null;
        const effectiveIsGlobal = effectiveStudentId ? (isGlobal === true) : true;

        const lesson = await prisma.lesson.create({
            data: {
                title: String(title).trim(),
                description: description || null,
                notes: notes || null,
                instrument: instrument || "Schlagzeug",
                isGlobal: effectiveIsGlobal,
                studentId: effectiveStudentId,
            },
            include: {
                materials: true,
                student: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        return NextResponse.json(
            {
                id: lesson.id,
                title: lesson.title,
                description: lesson.description || "",
                notes: lesson.notes || "",
                instrument: lesson.instrument,
                isGlobal: lesson.isGlobal,
                studentId: lesson.studentId,
                studentName: lesson.student?.name || (lesson.isGlobal ? "Alle Schüler" : "Keine Zuweisung"),
                createdAt: lesson.createdAt,
                files: [],
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating lesson:", error);
        return NextResponse.json({ error: "Fehler beim Erstellen der Lektion" }, { status: 500 });
    }
}
