"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineUser, HiOutlineShoppingCart, HiOutlineSearch } from "react-icons/hi";
import { useRouter } from "next/router";
import Link from "next/link";
import TextPressure from "@/components/animated/pressure.text";
import Button from "@/components/buttons/Buttons";
import Typography from "../Typography/Typography";
import TrueFocus from "../animated/true.text";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import Cookies from "js-cookie";
import axiosClient from "@/lib/axios";

interface User {
    id: string;
    name: string;
    email: string;
}

export default function Header() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const getUserUser = async () => {
        try {
            const res = await axiosClient.get("/users/current");
            if (res.data.data) {
                return res.data.data;
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
        return null;
    };

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserUser();
            if (userData) {
                setUser(userData);
            } else {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return (
        <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-b-2 border-red-600/30">
            {/* Mobile Layout */}
            <div className="md:hidden">
                {/* Top Row - Logo and Icons */}
                <div className="flex justify-between items-center px-4 py-4">
                    <nav className="flex items-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                            <div className="w-24 p-2 rounded-md bg-red-700">
                                <TextPressure text="PRAMSTORE" className="font-semibold text-black" minFontSize={12} />
                            </div>
                        </div>
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/70 transition-all duration-300 group cursor-pointer">
                            <HiOutlineUser className="text-white text-lg group-hover:text-red-400 transition-colors duration-300" />
                        </div>
                        <Link href={`/catalog/cart`} className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/70 transition-all duration-300 group cursor-pointer">
                            <HiOutlineShoppingCart className="text-white text-lg group-hover:text-red-400 transition-colors duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Second Row - Search */}
                <div className="px-4 pb-3">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-gray-600 rounded-full opacity-30 blur transition duration-300 group-focus-within:opacity-60"></div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full py-2 pl-10 pr-4 rounded-full text-sm bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:bg-white shadow-lg transition-all duration-300"
                            />
                            <HiOutlineSearch className="absolute left-3 top-2.5 text-gray-500 text-lg transition-colors duration-300 group-focus-within:text-red-600" />
                        </div>
                    </div>
                </div>

                {/* Third Row - User Info and Logout */}
                <div className="flex justify-between items-center px-4 pb-4 border-t border-gray-700/30 pt-3">
                    <div className="text-left">
                        <Typography size="xl" type="Header" className="text-white font-thin tracking-wide text-sm">
                            {user ? `Welcome, ${user.name}` : "Welcome, Guest"}
                        </Typography>
                        <div className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mt-1 opacity-60"></div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-60 blur transition duration-300 group-hover:opacity-100"></div>
                        <Button
                            onClick={() => {
                                Cookies.remove("access_token");
                                Cookies.remove("refresh_token");
                                Cookies.remove("user");
                                Cookies.remove("user_id");
                                router.push("/login");
                            }}
                            className="relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-500/30"
                            type="button"
                            color="Light"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
                    {/* Logo Section */}
                    <nav className="flex items-center gap-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                            <div className="w-32 p-2 rounded-md bg-red-700">
                                <TextPressure text="PRAMSTORE" className="font-semibold text-black" minFontSize={20} />
                            </div>
                        </div>
                    </nav>

                    {/* Search Section */}
                    <div className="relative w-full max-w-2xl mx-8">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-gray-600 rounded-full opacity-30 blur transition duration-300 group-focus-within:opacity-60"></div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products, brands, categories..."
                                    className="w-full py-3 pl-12 pr-6 rounded-full text-sm bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:bg-white shadow-lg transition-all duration-300"
                                />
                                <HiOutlineSearch className="absolute left-4 top-3.5 text-gray-500 text-xl transition-colors duration-300 group-focus-within:text-red-600" />
                            </div>
                        </div>
                    </div>

                    {/* User Actions Section */}
                    <div className="flex items-center gap-6">
                        {/* Icon Section */}
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/70 transition-all duration-300 group cursor-pointer">
                                <HiOutlineUser className="text-white text-xl group-hover:text-red-400 transition-colors duration-300" />
                            </div>
                            <Link href={`/catalog/cart`} className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/70 transition-all duration-300 group cursor-pointer">
                                <HiOutlineShoppingCart className="text-white text-xl group-hover:text-red-400 transition-colors duration-300" />
                            </Link>
                        </div>

                        {/* User Info & Logout Section */}
                        <div className="flex items-center gap-4 pl-4 border-l border-gray-600/50">
                            <div className="text-left">
                                <Typography size="xl" type="Header" className="text-white font-thin tracking-wide">
                                    {user ? `Welcome, ${user.name}` : "Welcome, Guest"}
                                </Typography>
                                <div className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mt-1 opacity-60"></div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg opacity-60 blur transition duration-300 group-hover:opacity-100"></div>
                                <Button
                                    onClick={() => {
                                        Cookies.remove("access_token");
                                        Cookies.remove("refresh_token");
                                        Cookies.remove("user");
                                        Cookies.remove("user_id");
                                        router.push("/login");
                                    }}
                                    className="relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-sm px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border border-red-500/30"
                                    type="button"
                                    color="Light"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-white"></div>
        </header>
    );
}