interface CourseWrapperProps { 
    children: React.ReactNode
 }

 export const CourseWrapper = ({ children }: CourseWrapperProps) => {
    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            {children}
        </li>
    )
 }