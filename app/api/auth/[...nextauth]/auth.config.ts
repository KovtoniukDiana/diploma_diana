import type { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import getUserFromDB from "@/src/utils/user";

export const authConfig: AuthOptions = {
    
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

                if(currentUser && currentUser.password === credentials.password) {
                    const {password, ...userWithoutPass} = currentUser;
                    return userWithoutPass as User;
                }

                return null
            }
        })
    ]
}