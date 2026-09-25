import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, role, genre, daw, packName } = body;

        if (!email || typeof email !== "string" || !email.includes("@")) {
            return NextResponse.json(
                { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
                { status: 400 }
            );
        }

        // Save lead to database
        const lead = await prisma.samplePackLead.create({
            data: {
                name: name ? String(name).trim() : null,
                email: String(email).trim().toLowerCase(),
                role: role ? String(role).trim() : null,
                genre: genre ? String(genre).trim() : null,
                daw: daw ? String(daw).trim() : null,
                packName: packName || "SYNTHESIS",
            },
        });

        return NextResponse.json({
            success: true,
            leadId: lead.id,
            downloadUrl: "/downloads/SYNTHESIS-Sample-Pack-Santino-Scavelli.zip",
            message: "Lead successfully recorded",
        });
    } catch (error) {
        console.error("Error creating sample pack lead:", error);
        return NextResponse.json(
            { error: "Fehler beim Verarbeiten der Anfrage. Bitte versuche es später noch einmal." },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const count = await prisma.samplePackLead.count();
        return NextResponse.json({ count });
    } catch {
        return NextResponse.json({ error: "Fehler beim Laden der Leads" }, { status: 500 });
    }
}
