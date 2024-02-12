"use client"

import { Compass, Layout } from "lucide-react"
import { SidebarItem } from "./sidebar-item"
import { usePathname } from "next/navigation"


const guestRoutes = [
// {
//     icon: Layout,
//     label: "Home",
//     href: "/",

// },
{
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
},

{
    icon: Layout,
    label: "Courses",
    href:'/courses',
},
{
    icon:Layout,
    label: "Calendar",
    href:"/calendar"
},
{
    icon:Layout,
    label:"Flashcards",
    href:"/flashcards"
},
{
    icon:Layout,
    label:"AI Tutor",
    href:"/aitutor"
},
{
    icon:Layout,
    label:"Study Goals",
    href:"/studygoals"
},
{
    icon:Layout,
    label:"knowledge graph",
    href:"/knowledgegraph"
}
]

export const SidebarRoutes = () => {
    const pathname = usePathname();


    const routes = guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}