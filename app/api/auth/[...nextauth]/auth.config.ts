import type { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import getUserFromDB from "@/src/utils/user";
import { comparePassword } from "@/src/utils/hashPassword";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  prisma  from "@/src/utils/prisma";


export const authConfig: AuthOptions = {
    
    adapter: PrismaAdapter(prisma),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),

        Credentials ({
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) return null;

                //const currentUser = {email: 'buben111004@gmail.com', password: '1234532'};

                const currentUser = await getUserFromDB(credentials.email);

                if(!currentUser) {
                    throw Error("Невірний email або пароль");
                };

                const passwordMatch = await comparePassword(credentials.password, currentUser.password);

                if (passwordMatch) {
                    const {password, ...userWithoutPass} = currentUser;
                    return userWithoutPass as User;
                    
                } else {
                    throw new Error("Невірний email або пароль.");
                }
            }
        })
    ]
}