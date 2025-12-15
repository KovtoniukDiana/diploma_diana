import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from '@prisma/client';


export async function POST(req: NextRequest) {

    const { email, password, confirmPassword } = await req.json();

}