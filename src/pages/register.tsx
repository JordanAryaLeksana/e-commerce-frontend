import Layout from "@/components/layout/layout"
import React, { useState } from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axiosClient from "@/lib/axios"
import Input from "@/components/input/Input"
import toast from "react-hot-toast"
import { useRouter } from "next/router"
import Button from "@/components/buttons/Buttons"
import { motion } from "framer-motion"
import Typography from "@/components/Typography/Typography"
import { HiUser, HiMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi"

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
    const [showPassword, setShowPassword] = useState(false)
    
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
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <motion.div
                        animate={{
                            x: [0, 100, -50, 0],
                            y: [0, -100, 50, 0],
                            scale: [1, 1.2, 0.8, 1],
                            opacity: [0.1, 0.3, 0.1, 0.2]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -100, 50, 0],
                            y: [0, 100, -50, 0],
                            scale: [1, 0.8, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1, 0.3]
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 5
                        }}
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"
                    />
                    
                    {/* Grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
                </div>

                {/* Main Register Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md mx-4"
                >
                    {/* Glassmorphic Container */}
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-gray-500/10 to-teal-500/20 rounded-2xl blur-lg animate-pulse" />
                        
                        {/* Main card */}
                        <div className="relative bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-cyan-500/5 p-8">
                            <FormProvider {...methods}>
                                <motion.form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-6"
                                >
                                    {/* Header Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        className="text-center space-y-4"
                                    >
                                        {/* Logo */}
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="inline-block relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-xl blur-sm opacity-75" />
                                            <div className="relative bg-gradient-to-r from-red-600 to-red-700 px-8 py-3 rounded-xl border border-red-500/30">
                                                <Typography
                                                    type="Header"
                                                    size="2xl"
                                                    className="text-white font-extrabold tracking-widest"
                                                >
                                                    PRAMSTORE
                                                </Typography>
                                            </div>
                                        </motion.div>

                                        {/* Subtitle */}
                                        <div className="space-y-2">
                                            <Typography
                                                type="Header"
                                                size="xl"
                                                className="text-gray-100 font-light"
                                            >
                                                Create Account
                                            </Typography>
                                            <Typography
                                                type="Paragraph"
                                                size="sm"
                                                className="text-gray-400 font-light"
                                            >
                                                Join us and start your premium journey
                                            </Typography>
                                        </div>

                                        {/* Divider */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                                            <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                                        </div>
                                    </motion.div>

                                    {/* Form Fields */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="space-y-5"
                                    >
                                        {/* Name Field */}
                                        <Input
                                            id="name"
                                            type="text"
                                            label="Full Name"
                                            placeholder="Enter your full name"
                                            required
                                            autoComplete="off"
                                            {...register("name")}
                                        />

                                        {/* Email Field */}
                                        <Input
                                            id="email"
                                            type="email"
                                            label="Email Address"
                                            placeholder="Enter your email"
                                            required
                                            autoComplete="off"
                                            {...register("email")}
                                        />

                                        {/* Password Field */}
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                label="Password"
                                                placeholder="Create a secure password"
                                                required
                                                autoComplete="off"
                                                {...register("password")}
                                            />
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                                                <motion.button
                                                    type="button"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                                                >
                                                    {showPassword ? <HiEyeOff className="text-lg" /> : <HiEye className="text-lg" />}
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Register Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.6 }}
                                        className="pt-2"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="relative group"
                                        >
                                            {/* Button glow effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-700 to-red-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                                            
                                            <Button
                                                type="submit"
                                                color="Light"
                                                onClick={() => {}}
                                                className="relative w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 border border-red-500/30 shadow-lg shadow-red-500/20"
                                            >
                                                <span className="flex items-center justify-center gap-2">
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.8, duration: 0.4 }}
                                                    >
                                                        Create Account
                                                    </motion.span>
                                                    <motion.div
                                                        animate={{ x: [0, 5, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                    >
                                                        →
                                                    </motion.div>
                                                </span>
                                            </Button>
                                        </motion.div>
                                    </motion.div>

                                    {/* Footer Links */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.6 }}
                                        className="text-center space-y-3 pt-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600/30 to-transparent" />
                                            <Typography size="xs" className="text-gray-500 font-light">
                                                Secure Registration
                                            </Typography>
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600/30 to-transparent" />
                                        </div>
                                        
                                        <div className="flex justify-center gap-6 text-xs">
                                            <motion.a
                                                href="/login"
                                                whileHover={{ scale: 1.05, color: "#06b6d4" }}
                                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 font-light"
                                            >
                                                Already have an account?
                                            </motion.a>
                                            <span className="text-gray-600">•</span>
                                            <motion.a
                                                href="/terms"
                                                whileHover={{ scale: 1.05, color: "#06b6d4" }}
                                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 font-light"
                                            >
                                                Terms & Privacy
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </motion.form>
                            </FormProvider>
                        </div>
                    </div>

                    {/* Status indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex justify-center gap-2 mt-6"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.8, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: "easeInOut"
                                }}
                                className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full"
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </section>
        </Layout>
    )
}