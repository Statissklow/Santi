const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Admin User
    const admin = await prisma.user.upsert({
        where: { email: 'admin@santino.com' },
        update: {},
        create: {
            email: 'admin@santino.com',
            name: 'Santino Scavelli',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    // Create Student User
    const student = await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: {
            email: 'student@example.com',
            name: 'Test Student',
            password: hashedPassword,
            role: 'STUDENT',
        },
    });

    console.log({ admin, student });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
