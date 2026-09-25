import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { checkIsAdmin } from "@/lib/checkAdmin";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const student = await prisma.user.findUnique({
            where: { id },
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
                assignedLessons: {
                    include: { materials: true },
                    orderBy: { createdAt: "desc" },
                },
                lessonLogs: {
                    orderBy: { date: "desc" },
                },
                loginLogs: {
                    orderBy: { createdAt: "desc" },
                    take: 20,
                },
            },
        });

        if (!student) {
            return NextResponse.json({ error: "Schüler nicht gefunden" }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        return NextResponse.json({ error: "Fehler beim Laden des Schülers" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const body = await req.json();
        const { name, email, password, instrument, phone, notes } = body;

        const updateData: any = {};
        if (name !== undefined) updateData.name = String(name).trim();
        if (email !== undefined) updateData.email = String(email).trim().toLowerCase();
        if (instrument !== undefined) updateData.instrument = instrument || "Schlagzeug";
        if (phone !== undefined) updateData.phone = phone || null;
        if (notes !== undefined) updateData.notes = notes || null;

        if (password && password.trim().length > 0) {
            updateData.password = await bcrypt.hash(password, 12);
        }

        if (updateData.email) {
            const existing = await prisma.user.findFirst({
                where: { email: updateData.email, id: { not: id } },
            });
            if (existing) {
                return NextResponse.json({ error: "E-Mail-Adresse bereits vergeben" }, { status: 409 });
            }
        }

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
                instrument: true,
                phone: true,
                notes: true,
                role: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: "Fehler beim Aktualisieren" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const isAuthorized = await checkIsAdmin(req);
    if (!isAuthorized) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Fehler beim Löschen" }, { status: 500 });
    }
}
