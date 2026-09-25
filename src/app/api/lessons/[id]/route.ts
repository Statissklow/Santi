import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkIsAdmin } from "@/lib/checkAdmin";

// PUT /api/lessons/[id] — update a lesson
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await req.json();
        const { title, description, notes, instrument, isGlobal, studentId } = body;

        const updateData: any = {};
        if (title !== undefined) updateData.title = String(title).trim();
        if (description !== undefined) updateData.description = description || null;
        if (notes !== undefined) updateData.notes = notes || null;
        if (instrument !== undefined) updateData.instrument = instrument || "Schlagzeug";

        if (studentId !== undefined) {
            updateData.studentId = studentId && studentId !== "ALL" ? studentId : null;
            if (isGlobal !== undefined) {
                updateData.isGlobal = isGlobal;
            } else {
                updateData.isGlobal = !updateData.studentId;
            }
        } else if (isGlobal !== undefined) {
            updateData.isGlobal = isGlobal;
        }

        const lesson = await prisma.lesson.update({
            where: { id },
            data: updateData,
            include: {
                materials: true,
                student: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        return NextResponse.json({
            id: lesson.id,
            title: lesson.title,
            description: lesson.description || "",
            notes: lesson.notes || "",
            instrument: lesson.instrument,
            isGlobal: lesson.isGlobal,
            studentId: lesson.studentId,
            studentName: lesson.student?.name || (lesson.isGlobal ? "Alle Schüler" : "Keine Zuweisung"),
            createdAt: lesson.createdAt,
            files: lesson.materials.map((m) => ({
                id: m.id,
                name: m.title,
                category: m.category,
                source: m.source,
                url: m.fileUrl,
                size: m.size,
            })),
        });
    } catch (error) {
        console.error("Error updating lesson:", error);
        return NextResponse.json({ error: "Fehler beim Aktualisieren der Lektion" }, { status: 500 });
    }
}

// DELETE /api/lessons/[id] — delete a lesson
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        await prisma.lesson.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting lesson:", error);
        return NextResponse.json({ error: "Fehler beim Löschen der Lektion" }, { status: 500 });
    }
}
