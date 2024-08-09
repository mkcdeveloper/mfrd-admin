import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {


                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...credentials, role: 'admin' }),
                });
                const user = await res.json();

                if (res.ok && user) {
                    return { ...user.user, token: user.token };
                }
                return null;
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {

            if (user) {
                token.user = user;
            }
            return token;
        },
        session: ({ session, token }) => {
            session.user = token.user as any;
            return session;
        },
    },
    events: {
        async signOut({ token }) {

            try {
                // Call your Laravel API logout endpoint
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token?.user?.token}`,
                    },
                });

                if (!response.ok) {
                    console.error("Failed to logout on server");
                }
            } catch (error) {
                console.error("Error during logout:", error);
            }
        },
    },
    pages: {
        signIn: "/login",
    },
};