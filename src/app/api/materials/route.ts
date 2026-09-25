import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkIsAdmin } from "@/lib/checkAdmin";

// POST /api/materials — add a material to a lesson
export async function POST(req: NextRequest) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { lessonId, name, category, source, url, size } = body;

    if (!lessonId || !name || !category) {
        return NextResponse.json(
            { error: "lessonId, name, and category are required" },
            { status: 400 }
        );
    }

    const material = await prisma.material.create({
        data: {
            title: name,
            category,
            source: source || "upload",
            fileUrl: url || "",
            size: size || null,
            lessonId,
        },
    });

    return NextResponse.json(
        {
            id: material.id,
            name: material.title,
            category: material.category,
            source: material.source,
            url: material.fileUrl,
            size: material.size,
        },
        { status: 201 }
    );
}

// DELETE /api/materials — delete a material by id
export async function DELETE(req: NextRequest) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    await prisma.material.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
