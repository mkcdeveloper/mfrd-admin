import { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      token?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    token?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      token?: string
    } & DefaultUser
  }
}