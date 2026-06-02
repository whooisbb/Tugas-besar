import { NextAuthOptions } from "next-auth";

import { PrismaAdapter }
from "@auth/prisma-adapter";

import CredentialsProvider
from "next-auth/providers/credentials";

import { prisma }
from "./prisma";

import bcrypt
from "bcrypt";

export const authOptions: NextAuthOptions = {

  adapter:
    PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [

    CredentialsProvider({

      name: "credentials",

      credentials: {

        email: {},

        password: {},
      },

      async authorize(
        credentials: any
      ) {

        const user =
          await prisma.user.findUnique({

            where: {
              email:
                credentials.email,
            },
          });

        if (!user) {

          throw new Error(
            "User tidak ditemukan"
          );
        }

        const passwordMatch =
          await bcrypt.compare(
            credentials.password,
            user.password
          );

        if (!passwordMatch) {

          throw new Error(
            "Password salah"
          );
        }

        return {

          id: user.id,

          name: user.name,

          email: user.email,

          role: user.role,
        };
      },
    }),
  ],

  callbacks: {

    async jwt({
      token,
      user,
    }: any) {

      if (user) {

        token.id =
          user.id;

        token.role =
          user.role;
      }

      return token;
    },

    async session({
      session,
      token,
    }: any) {

      if (session.user) {

        session.user.id =
          token.id;

        session.user.role =
          token.role;
      }

      return session;
    },
  },

  pages: {

    signIn: "/login",
  },

  secret:
    process.env.NEXTAUTH_SECRET,
};