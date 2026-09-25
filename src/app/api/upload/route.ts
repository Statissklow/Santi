import { NextResponse } from 'next/server';
import { checkIsAdmin } from "@/lib/checkAdmin";
import path from "path";
import fs from "fs/promises";

export async function POST(request: Request): Promise<NextResponse> {
    const isAuthorized = await checkIsAdmin(request);
    if (!isAuthorized) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // If in production on Vercel with token, try Vercel Blob
        if (process.env.VERCEL && process.env.BLOB_READ_WRITE_TOKEN) {
            try {
                const { put } = await import('@vercel/blob');
                const blob = await put(file.name, file, { access: 'public' });
                if (blob?.url) {
                    return NextResponse.json({ url: blob.url });
                }
            } catch (blobErr) {
                console.warn("Vercel Blob failed, falling back to local file storage:", blobErr);
            }
        }

        // Local storage fallback (saves into public/uploads/)
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const safeOriginalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filename = `${Date.now()}-${safeOriginalName}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: (error as Error).message || "Fehler beim Upload der Datei" },
            { status: 500 }
        );
    }
}
