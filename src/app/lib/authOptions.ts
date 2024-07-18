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
                    body: JSON.stringify(credentials),
                });
                const user = await res.json();
                console.log(user);
                if (res.ok && user) {
                    return { ...user.user, token: user.token };
                }
                return null;
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            console.log("JWT callback - token:", token);
            console.log("JWT callback - user:", user);

            if (user) {
                token.user = user;
            }
            return token;
        },
        session: ({ session, token }) => {
            console.log("Session callback - session:", session);
            console.log("Session callback - token:", token);
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