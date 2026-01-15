import { NextResponse, NextRequest } from "next/server";
import { saltAndHashPassword } from "@/src/utils/hashPassword";
import prisma from "@/src/utils/prisma";

export async function POST(req: NextRequest) {

    try {

        const { name, email, password, confirmPassword } = await req.json();

        const existingUser = await prisma.user.findUnique({where: { email }});
        if(existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await saltAndHashPassword(password);

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            }
        })

        return NextResponse.json(
            { success: true, user: { id: newUser.id, email: newUser.email } }, 
            { status: 201 }
        );
            
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

