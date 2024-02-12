"use client"

import {createCourse} from "@/actions/create-course"

import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { useAction } from "@/hooks/use-action"

export const Form = () => {

    const {execute, fieldErrors} = useAction(createCourse, {
        onSuccess: (data) => {
        console.log(data)
    }, onError: (error) => {
        console.error(error)
    }
})

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string

        execute({title})
    }
   
    return (
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2 ">
            <FormInput 
            label="Title"
            id="title"
            errors={fieldErrors}/>
                </div>
                <FormSubmit>
                    Create Course
                </FormSubmit>
        </form>
    )
}