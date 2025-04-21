import Layout from "@/components/layout/layout"
import React from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axiosClient from "@/lib/axios"
import Input from "@/components/input/Input"
import Button from "@/components/buttons/Buttons"
// import { Toast } from "@/components/animated/toast"
import toast from "react-hot-toast"
import SplitText from "@/components/animated/splitText"
import FadeContent from "@/components/animated/fadeContent"
type FormValues = {
    name: string;
    email: string;
    password: string;
}


const validationSchema: ZodType<FormValues> = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).max(10, {
        message: "Name must be less than 100 characters"
    }).min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).max(100, {
        message: "Email must be less than 100 characters"
    }).email({ message: "Invalid email address" }),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    }).max(30, {
        message: "Password must be less than 100 characters"
    }).min(6, { message: "Password must be at least 6 characters long" }),
})

export default function Register() {
    const methods = useForm<FormValues>({
        resolver: zodResolver(validationSchema)
    })

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields }
    } = methods

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axiosClient.post("/users/register", data)
            if (response.status === 200) {
                toast.success("User registered successfully")
                console.log(response.data)
            }
        } catch (error: any) {
            if (error.response) {
                const data = JSON.stringify(error.response.data)
                const message = data.split('"')[3]
                toast.error(message)
                console.log(message)
            }
        }
    }



    return (
        <Layout withNavbar={false} withFooter={false}>
            <section className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 ">
                <FadeContent delay={0.5}>
                    <SplitText
                        text="Tell us about yourself!"
                        className="text-5xl font-bold text-white mb-4"
                    />
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 w-full max-w-md mx-auto  rounded-lg shadow-lg">
                            <Input
                                {...register("name")}
                                id="name"
                                type="text"
                                label="Name"
                                placeholder="Enter your name"


                            />
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                placeholder="******"
                                {...register("password")}

                            />
                            <Button className="text-black" type="submit" color="Light" onClick={() => { }}>
                                Register
                            </Button>
                        </form>
                    </FormProvider>
                </FadeContent>
            </section>
        </Layout>

    )
}
