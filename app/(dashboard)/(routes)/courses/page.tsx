import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import Link from "next/link"

import {createCourse} from "@/actions/create-course"

import { Course } from "./[courseId]/course"

import { PrismaClient } from "@prisma/client"
import { Form } from "./[courseId]/form"
import { Info } from "./[courseId]/_components/info"
import { Separator } from "@/components/ui/separator"
import { CourseList } from "./[courseId]/_components/course-list"
import { Suspense } from "react"
const prisma = new PrismaClient()

const CoursesPage = async () => {

    // const courses = await db.course.findMany()


    


    return (
       <div className="w-full mb-20">

        {/* <Info /> */}
        {/* <Separator className="my-4"/> */}
        {/* <Form />
        
        

        <div className="space-y-4 mt-8">
            {courses.map((course) => (
                <Course key={course.id}
                title={course.title} id={course.id}/>
                    
            ))}
            </div> */}

        <div className="px-2 md:px-4">
            {/* <Suspense fallback={<div>Loading...</div>}></Suspense> */}
            <CourseList />
            
        </div>
        {/* <Link href="/create">
            <Button>
                Course
            </Button>

        </Link> */}
       </div>
    )
}

export default CoursesPage