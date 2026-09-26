import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET || "santino-scavelli-secret-key-2024",
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const cleanEmail = credentials.email.trim().toLowerCase();

                const user = await prisma.user.findFirst({
                    where: {
                        email: {
                            equals: cleanEmail,
                            mode: "insensitive",
                        },
                    },
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                // Record login timestamp & history
                const now = new Date();
                try {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { lastLoginAt: now },
                    });
                    await prisma.loginLog.create({
                        data: {
                            userId: user.id,
                            createdAt: now,
                        },
                    });
                } catch (logErr) {
                    console.error("Error recording login log:", logErr);
                }

                return {
                    id: user.id + "",
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    role: u.role,
                };
            }
            return token;
        },
    },
};
