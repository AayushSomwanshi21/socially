import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export const POST = async () => {


    try {

        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: user.id,
            },

        })

        if (!existingUser) {
            const new_user = await prisma.user.create({
                data: {
                    clerkId: user.id,
                    name: `${user.firstName || ""} ${user.lastName || ""}`,
                    username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                    email: user.emailAddresses[0].emailAddress,
                    image: user.imageUrl,
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