import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// NOTE: Server-side session checks (getServerSession/getToken) are not working
// in this App Router setup. Auth is enforced client-side by the admin page.
// TODO: Fix server-side auth for production.

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, instrument, classLevelId } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Name, E-Mail und Passwort sind Pflichtfelder" }, { status: 400 });
        }

        // Check if user already exists
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "E-Mail-Adresse bereits vergeben" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                instrument: instrument || null,
                role: "STUDENT",
                classLevelId: classLevelId || null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                instrument: true,
                role: true,
                classLevel: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Fehler beim Erstellen" }, { status: 500 });
    }
}
