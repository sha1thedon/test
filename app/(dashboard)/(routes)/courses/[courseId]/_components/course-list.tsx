import { HelpCircle, User2 } from "lucide-react"

import { Hint } from "@/components/hint"
import { Form } from "react-bootstrap"
import { FormPopover } from "@/components/form/form-popover"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/dist/server/api-utils"
import Link from "next/link"

export const CourseList = async () => {

    const { userId} = auth()

    if (!userId) {
        return null
    }

    const courses = await db.course.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    

    return(
        <div>
            <div className="flex items-center font-semibold text-lg text--700">
                <User2 className="h-6 w-6 mr-2"/>
                <h3>My Courses</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {courses.map((course) => (
                    <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-blue-400 rounded-sm h-full w-full p-2 overflow-hidden"
                    // style={{height: "fit-content"}}
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                        <p className="relative font-semibold text-light">
                            {course.title}
                        </p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                <div 
                role="button"
                className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                >
                    <p className="text-sm">Create new Course</p>
                    
                    <Hint
                    sideOffset={40}
                    description="Create a new course to start adding notes"
                    >
                        <HelpCircle 
                        className="absolute bottom-2 right-2 h-[14px] w-[14px]"
                        />
                    </Hint>

                </div>
                </FormPopover>
                </div>
        </div>
    )
}

