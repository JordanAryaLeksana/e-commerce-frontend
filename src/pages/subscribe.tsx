import { FormProvider, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "@/components/input/Input";
import toast from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { addCollaborator } from "@/store/slice/collabsSlice";
import {  AppDispatch } from "@/store/store";
type FormValues = {
    name: string;
    email: string;
    role: "ecommerce_expert" | "supplier" | "influencer" | "developer";
};

const validationSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(100, "Name must be less than 100 characters")
        .nonempty("Name is required"),
    email: z
        .string()
        .email("Invalid email address")
        .max(100, "Email must be less than 100 characters")
        .nonempty("Email is required"),
    role: z.enum(["ecommerce_expert", "supplier", "influencer", "developer"], {
        required_error: "Role is required"
    }),
});
export default function Colaboration() {
    const methods = useForm<FormValues>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "ecommerce_expert",
        },
    });
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods
    const dispatch = useDispatch<AppDispatch>();
    
    const submit = async (data: FormValues) => {
        try {
            await dispatch(addCollaborator(data)).unwrap();
            toast.success("We've sent you an email! Thank you for joining our community.");
            methods.reset();
        } catch (error) {
            toast.error("Failed to subscribe. Please try again later.");
        }
    }
    return (
       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        
            <div className="absolute inset-0">
            
                <motion.div
                    className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl"
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-40 right-20 w-24 h-24 bg-teal-400/10 rounded-full blur-xl"
                    animate={{
                        y: [0, 15, 0],
                        scale: [1, 0.9, 1],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-1/3 w-40 h-40 bg-cyan-300/10 rounded-full blur-xl"
                    animate={{
                        y: [0, -25, 0],
                        x: [0, 10, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent bg-[length:100px_100px]" />
                </div>
            </div>

            
            <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <motion.h1
                            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent mb-3"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                backgroundSize: "200% 200%"
                            }}
                        >
                            PRAMSTORE
                        </motion.h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-0.5 w-20 bg-gradient-to-r from-cyan-500 to-teal-400 mx-auto mb-4"
                        />
                        <p className="text-cyan-200/80 text-lg font-light">
                            Join Our Community
                        </p>
                        <p className="text-cyan-300/60 text-sm mt-2">
                            Connect • Collaborate • Create
                        </p>
                    </motion.div>

                    {/* Form Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        {/* Neon Border Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 rounded-3xl blur opacity-30 animate-pulse" />
                        
                        <div className="relative bg-slate-900/70 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
                            <FormProvider {...methods}>
                                <motion.form
                                    onSubmit={handleSubmit(submit)}
                                    className="space-y-6"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        <Input
                                            id="name"
                                            type="text"
                                            label="Enter your name"
                                            placeholder=""
                                            autoComplete="off"
                                            {...register("name")}
                                        />
                                        {errors.name && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-xs mt-1"
                                            >
                                                {errors.name.message}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                    >
                                        <Input
                                            id="email"
                                            type="email"
                                            label="Enter your email"
                                            placeholder=""
                                            autoComplete="off"
                                            {...register("email")}
                                        />
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-xs mt-1"
                                            >
                                                {errors.email.message}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.8 }}
                                    >
                                        <label className="block text-cyan-300 text-sm font-medium mb-2">
                                            Choose your role
                                        </label>
                                        <div className="relative">
                                            <select
                                                {...register("role")}
                                                defaultValue="ecommerce_expert"
                                                className="w-full bg-slate-900/50 backdrop-blur-sm text-cyan-100 border border-cyan-500/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-300/80 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 hover:border-cyan-400/50 appearance-none cursor-pointer"
                                            >
                                                <option value="ecommerce_expert" className="bg-slate-800 text-cyan-100">E-commerce Expert</option>
                                                <option value="supplier" className="bg-slate-800 text-cyan-100">Supplier</option>
                                                <option value="influencer" className="bg-slate-800 text-cyan-100">Influencer</option>
                                                <option value="developer" className="bg-slate-800 text-cyan-100">Developer</option>
                                            </select>
                                            {/* Custom Arrow */}
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.role && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-xs mt-1"
                                            >
                                                {errors.role.message}
                                            </motion.p>
                                        )}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.9 }}
                                    >
                                        <motion.button
                                            type="submit"
                                            whileHover={{ 
                                                scale: 1.02, 
                                                y: -2,
                                                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className="relative w-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-teal-500 hover:from-cyan-500 hover:via-cyan-400 hover:to-teal-400 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-cyan-500/25 overflow-hidden group"
                                        >
                                            {/* Button Shine Effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: "100%" }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                SUBSCRIBE
                                                <motion.svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    animate={{ x: [0, 3, 0] }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </motion.svg>
                                            </span>
                                        </motion.button>
                                    </motion.div>
                                </motion.form>
                            </FormProvider>
                        </div>
                    </motion.div>

                    {/* Footer Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="text-center mt-8"
                    >
                        <p className="text-cyan-300/60 text-sm">
                            Curated Streetwear Excellence
                        </p>
                        <p className="text-cyan-400/40 text-xs mt-1">
                            Authentic pieces • Exclusive collections • Timeless style
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}