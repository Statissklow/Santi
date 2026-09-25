import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { checkIsAdmin } from "@/lib/checkAdmin";

export async function GET() {
    try {
        const students = await prisma.user.findMany({
            where: {
                role: "STUDENT",
            },
            select: {
                id: true,
                name: true,
                email: true,
                instrument: true,
                phone: true,
                notes: true,
                role: true,
                lastLoginAt: true,
                createdAt: true,
                _count: {
                    select: {
                        assignedLessons: true,
                        lessonLogs: true,
                        loginLogs: true,
                    },
                },
                loginLogs: {
                    take: 5,
                    orderBy: { createdAt: "desc" },
                },
            },
            orderBy: {
                name: "asc",
            },
        });

        return NextResponse.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { name, email, password, instrument, phone, notes } = body;

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, E-Mail und Passwort sind Pflichtfelder" },
                { status: 400 }
            );
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const existing = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existing) {
            return NextResponse.json(
                { error: "E-Mail-Adresse bereits vergeben" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const student = await prisma.user.create({
            data: {
                name: String(name).trim(),
                email: normalizedEmail,
                password: hashedPassword,
                instrument: instrument || "Schlagzeug",
                phone: phone || null,
                notes: notes || null,
                role: "STUDENT",
            },
            select: {
                id: true,
                name: true,
                email: true,
                instrument: true,
                phone: true,
                notes: true,
                role: true,
                createdAt: true,
            },
        });

        return NextResponse.json(student, { status: 201 });
    } catch (error) {
        console.error("Error creating student:", error);
        return NextResponse.json({ error: "Fehler beim Erstellen des Schülers" }, { status: 500 });
    }
}
