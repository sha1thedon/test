import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

const CourseIdLayout = async ({ children, params, }: {
    children: React.ReactNode;
    params: {
        courseId: string;
    };
}) => {

    const {userId} = auth()

    if (!userId){
        return null
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        }
    
    })

    if (!course) {
        notFound()
    }
    return (
        <div 
        >
            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    )
}

export default CourseIdLayout