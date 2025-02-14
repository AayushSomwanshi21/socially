import { prisma } from "@/lib/prisma";

export const GET = async () => {

    try {
        const user_db = await prisma.user.findUnique({
            where: {
                clerkId: "user_2sckNERtRSmG4RBVsFl1W8xouw3"
            }
        })
        return new Response(JSON.stringify(user_db), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 });
    }
}