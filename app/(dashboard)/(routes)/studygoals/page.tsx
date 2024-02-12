import { Button } from "@/components/ui/button"
import Link from "next/link"


const StudyGoals = () => {
    return(
    <Link href="/studygoals/create">
    <Button>
        Create Study Goal
    </Button>

</Link>
    )

}

export default StudyGoals