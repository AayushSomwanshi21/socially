import { currentUser } from "@clerk/nextjs/server"


export const GET = async () => {

    try {
        const user_clerk = await currentUser();
        return new Response(JSON.stringify(user_clerk), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch user", { status: 500 });
    }
}