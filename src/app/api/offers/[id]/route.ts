import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkIsAdmin } from "@/lib/checkAdmin";

// PUT /api/offers/[id] — update an offer
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await req.json();
        const { icon, title, desc, cta, link, active, order } = body;

        const updated = await prisma.offer.update({
            where: { id },
            data: {
                ...(icon !== undefined && { icon }),
                ...(title !== undefined && { title }),
                ...(desc !== undefined && { desc }),
                ...(cta !== undefined && { cta }),
                ...(link !== undefined && { link }),
                ...(active !== undefined && { active }),
                ...(order !== undefined && { order }),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating offer:", error);
        return NextResponse.json({ error: "Fehler beim Aktualisieren des Angebots" }, { status: 500 });
    }
}

// DELETE /api/offers/[id] — delete an offer
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        await prisma.offer.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting offer:", error);
        return NextResponse.json({ error: "Fehler beim Löschen des Angebots" }, { status: 500 });
    }
}
