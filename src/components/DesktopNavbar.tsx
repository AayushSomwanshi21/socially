"use client"

import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser, User } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";


function DesktopNavbar() {

    const { user, isLoaded } = useUser();


    async function saveUserToDB() {
        if (user) {
            try {
                await fetch("/api/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
            } catch (error) {
                console.error("Error saving user:", error);
            }
        }
    }


    useEffect(() => {
        if (isLoaded && user) {
            saveUserToDB();
        }
    }, [isLoaded, user]);


    return (
        <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href="/">
                    <HomeIcon className="w-4 h-4" />
                    <span className="hidden lg:inline">Home</span>
                </Link>
            </Button>

            {user ? (
                <>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link href="/notifications">
                            <BellIcon className="w-4 h-4" />
                            <span className="hidden lg:inline">Notifications</span>
                        </Link>
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-2" asChild>
                        <Link
                            href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
                                }`}
                        >
                            <UserIcon className="w-4 h-4" />
                            <span className="hidden lg:inline">Profile</span>
                        </Link>
                    </Button>
                    <UserButton />
                </>
            ) : (
                <SignInButton mode="modal">
                    <Button variant="default">Sign In</Button>
                </SignInButton>
            )}
        </div>
    );
}
export default DesktopNavbar;