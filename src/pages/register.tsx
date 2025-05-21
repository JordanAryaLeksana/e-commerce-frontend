import Layout from "@/components/layout/layout"
import React from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axiosClient from "@/lib/axios"
import Input from "@/components/input/Input"
import toast from "react-hot-toast"
import SplitText from "@/components/animated/splitText"
import FadeContent from "@/components/animated/fadeContent"
import { useRouter } from "next/router"
import Button from "@/components/buttons/Buttons"
type FormValues = {
    name: string
    email: string
    password: string
}

const validationSchema: ZodType<FormValues> = z.object({
    name: z
        .string()
        .max(100, { message: "Name must be less than 100 characters" })
        .min(3, { message: "Name must be at least 3 characters long" }),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .max(100, { message: "Email must be less than 100 characters" }),
    password: z
        .string()
        .max(30, { message: "Password must be less than 100 characters" })
        .min(6, { message: "Password must be at least 6 characters long" }),
})

export default function Register() {
    const router = useRouter()
    const methods = useForm<FormValues>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axiosClient.post("/users/register", data)
            if (response.status === 200) {
                toast.success("User registered successfully")
                router.push("/login")
            }
        } catch (error: any) {
            const raw = error.response.data.errors
            let message = "Terjadi kesalahan"

            if (Array.isArray(raw)) {
                message = raw.join(", ")
            } else if (typeof raw === "string") {
                message = raw
            }
            toast.error(message)
        }
    }

    return (
        <Layout withNavbar={false} withFooter={false}>
            <section className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
                <FadeContent delay={0.5}>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-5 w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-red-600"
                        >
                            <div className="bg-red-600 p-4 rounded-md mb-6">
                                <SplitText
                                    text="REGISTER TO THE HYPE"
                                    className="text-2xl sm:text-xl font-extrabold text-white tracking-widest mb-6 uppercase text-center"
                                />
                            </div>
                            <Input
                                {...register("name")}
                                id="name"
                                type="text"
                                label="Name"
                                placeholder="John Doe"
                                autoComplete="off"
                            />
                            <Input
                                {...register("email")}
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="john@example.com"
                                autoComplete="off"
                            />
                            <Input
                                {...register("password")}
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="******"
                                autoComplete="off"
                            />

                            <Button
                                type="submit"
                                className="w-full py-3 font-bold text-white uppercase tracking-wide rounded-md bg-red-600 hover:bg-white hover:text-red-600 border-2 border-red-600 transition-colors duration-300"
                                onClick={() => { }}
                                color="Light"
                            >
                                Register
                            </Button>
                        </form>
                    </FormProvider>
                </FadeContent>
            </section>
        </Layout>
    )
}
