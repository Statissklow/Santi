import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkIsAdmin } from "@/lib/checkAdmin";

// GET /api/offers — fetch offers
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const includeInactive = searchParams.get("all") === "true";

        const whereClause = includeInactive ? {} : { active: true };

        const offers = await prisma.offer.findMany({
            where: whereClause,
            orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        });

        return NextResponse.json(offers);
    } catch (error) {
        console.error("Error fetching offers:", error);
        return NextResponse.json({ error: "Fehler beim Laden der Angebote" }, { status: 500 });
    }
}

// POST /api/offers — create a new offer
export async function POST(req: NextRequest) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { icon, title, desc, cta, link, active } = body;

        if (!title || !desc) {
            return NextResponse.json({ error: "Titel und Beschreibung sind erforderlich" }, { status: 400 });
        }

        const count = await prisma.offer.count();

        const offer = await prisma.offer.create({
            data: {
                icon: icon || "⭐",
                title,
                desc,
                cta: cta || "Mehr erfahren",
                link: link || "/#contact",
                active: active !== undefined ? active : true,
                order: count + 1,
            },
        });

        return NextResponse.json(offer, { status: 201 });
    } catch (error) {
        console.error("Error creating offer:", error);
        return NextResponse.json({ error: "Fehler beim Erstellen des Angebots" }, { status: 500 });
    }
}
