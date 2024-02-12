

import {db} from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { TitleForm } from "./[courseId]/_components/title-form"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

const CourseIdPage = async ({
    params
}: {
    params: {courseId: string}
}) => {

    const {userId} = auth()
    if (!userId){
        return redirect("/")
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    })

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        }
    })

    console.log(categories)

    if (!course) {
        return redirect("/")
    }
    const requiredFields = [
        course.title,
        course.categoryId
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalFields})`

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap0y-2">
                    <h1 className="text-2xl font-medium">
                        Course setup
                    </h1>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="h-full flex flex-col items-center justify-center">
                        <Link href="/courses/notes">
                        <Button>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Create a note
                        </Button>
                        </Link>
                    </div>

                </div>
        </div>
    )
}

export default CourseIdPage