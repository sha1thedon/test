import { deleteCourse } from "@/actions/delete-course/page"
import { Button } from "@/components/ui/button"
import { FormDelete } from "./form-delete"


interface CourseProps {
    id: string
    title: string
}

export const Course = ({ id, title }: CourseProps) => {
    const deleteCoursewithID = deleteCourse.bind(null, id)
    return (
        <form action={deleteCoursewithID} className="flex items-center gap-x-2">
            <p>Course title: {title}</p>
            <FormDelete />
        </form>
    )
}



