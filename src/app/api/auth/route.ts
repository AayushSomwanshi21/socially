import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {

    try {

        const { clerkId, name, username, email, image } = await req.json();


        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId,
            },

        })

        if (!existingUser) {
            const new_user = await prisma.user.create({
                data: {
                    clerkId,
                    name,
                    username,
                    email,
                    image,
                },
            });
            return NextResponse.json({ message: `User saved successfully:${new_user}` }, { status: 200 });
        }
        else {
            return NextResponse.json({ message: "User already exists" }, { status: 200 });
        }



    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

} 