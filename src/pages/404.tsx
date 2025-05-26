
import { motion } from "framer-motion";
import Link from "next/link";
export default function Custom404() {
    return (
        <div className="flex flex-col items-center text-center justify-center h-screen w-screen bg-gradient-to-r from-gray-800 via-gray-900 to-red-800 bg-opacity-90 backdrop-blur-md">
            <motion.h1 animate={{
                scale: [1, 1.05, 1],
                opacity: [0, 1, 1],
                transition: { duration: 0.5 }
            }} className="text-4xl font-bold text-white">404 - Page Not Found</motion.h1>
            <motion.p animate={{
                opacity: [0, 1],
                transition: { duration: 0.5, delay: 0.2 }
            }} className="text-lg font-light text-gray-400 mt-4">The page you are looking for does not exist.</motion.p>
            <Link href="/" className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Go to Home  </Link>
        </div>
    )
}