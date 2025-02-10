"use server"

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function userSync() {

    try {

        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return
        }

        // if user already exists
        const exisitingUser = await prisma.user.findUnique({
            where: {
                clerkId: userId
            },
        });

        if (exisitingUser) {
            return exisitingUser
        }

        // if user doesnt exist...create a new user
        const dbUser = await prisma.user.create({
            data: {
                clerkId: userId,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split('@')[0],
                email: user.emailAddresses[0].emailAddress,
                image: user.imageUrl,
            }
        })
        return dbUser;

    } catch (error) {
        console.log('Error creating user', error);
    }
}


export async function getUserByClearId(clerkId: string) {

    return prisma.user.findUnique({
        where: {
            clerkId: clerkId,
        },
        include: {
            _count: {
                select: {
                    followers: true,
                    following: true,
                    posts: true,
                }
            }
        }
    })
}