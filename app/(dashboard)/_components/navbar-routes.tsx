"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {LogOut } from "lucide-react";
import Link from "next/link"

export const NavbarRoutes = () => {
    const pathname = usePathname()
    const router = useRouter()

    const isPlayerPage = pathname?.includes("/chapter")

    return (
        <div className="flex gap-x-2 ml-auto">
            {isPlayerPage ? (
                <Button>
                    <LogOut className=" bg-white h-4 w-4 mr-2"/>
                    Exit
                </Button>
            ) : (
                <Link href={"#"}>
                    <Button size="sm" variant="ghost">
                        
                    </Button>
                </Link>
            )
        
        }
            <UserButton 
                afterSignOutUrl="/"
            />

        </div>
    )
}