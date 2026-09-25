import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, newPassword } = body;

        if (!email || !newPassword) {
            return NextResponse.json(
                { error: "Bitte gib deine E-Mail-Adresse und ein neues Passwort ein." },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: "Das Passwort muss mindestens 6 Zeichen lang sein." },
                { status: 400 }
            );
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Kein Benutzer mit dieser E-Mail-Adresse gefunden." },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({
            success: true,
            message: "Dein Passwort wurde erfolgreich geändert. Du kannst dich jetzt einloggen.",
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        return NextResponse.json(
            { error: "Fehler beim Zurücksetzen des Passworts." },
            { status: 500 }
        );
    }
}
