import React, { useState } from "react";
import Typography from "../Typography/Typography";
import { IoAccessibility, IoCartOutline, IoHomeOutline, IoPhonePortraitOutline, IoTrendingUpOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { HiFire } from "react-icons/hi";
import { BsBag } from "react-icons/bs";

const Links = [
    { name: "Home", href: "/", icon: <IoHomeOutline size={20} /> },
    { name: "Shop", href: "/catalog", icon: <IoCartOutline size={20} /> },
    { name: "On Sale", href: "/onsale", icon: <HiFire size={20} /> },
    { name: "New Arrivals", href: "/new-arrival", icon: <IoTrendingUpOutline size={20} /> },
    { name: "Brands", href: "/brands", icon: <BsBag size={20} /> },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()
    return (
        <header className="w-full bg-opacity-10 bg-gradient-to-r from-gray-800 via-gray-900 to-red-800 backdrop-blur-md backdrop-saturate-200 border-b border-white/10">
            <div className="flex justify-between items-center p-4">
                <Typography
                    type="Header"
                    size="base"
                    className="flex items-center gap-2 text-white font-bold"
                >
                    <IoPhonePortraitOutline size={20} />
                    Soon Available on Play Store!
                </Typography>


                <nav className="hidden md:flex flex-row gap-5 items-center bg-transparent  px-4 py-2 rounded-md ">
                    {Links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <motion.div
                                key={link.name}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-full"
                            >
                                <Link href={link.href}>
                                    <motion.div
                                        className={`flex items-center text-nowrap gap-1 px-2 font-light py-1 justify-center rounded-md 
                  transition-color cursor-pointer
                  ${isActive ? "bg-cyan-300/20 text-cyan-100" : "text-white"}
                `}
                                        whileHover={{ backgroundColor: "rgba(94,234,212,0.1)" }}
                                        transition={{ duration: 0.2, ease: "easeIn" }}
                                    >
                                        {link.icon}
                                        {link.name}
                                    </motion.div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>


            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col md:hidden items-center gap-4 py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-red-800 bg-opacity-90 backdrop-blur-md"
                        >
                        {Links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <motion.div
                                    key={link.name}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center text-nowrap gap-1 px-2 font-light py-1 justify-center rounded-md 
                  transition-color cursor-pointer
                  ${isActive ? "bg-cyan-300/20 text-cyan-100" : "text-white"}
                `}
                                    whileHover={{ backgroundColor: "rgba(94,234,212,0.1)" }}
                                    transition={{ duration: 0.2, ease: "easeIn" }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-white font-medium text-base hover:text-red-400 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
