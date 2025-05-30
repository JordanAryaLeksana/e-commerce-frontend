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
        <header className="w-full flex justify-between items-center px-6 py-8 bg-zinc-950">
            <nav className="hidden md:flex items-center gap-6 text-white text-sm font-semibold">
                <div className="w-32 p-2 rounded-sm bg-red-700">
                    <TextPressure text="PRAMSTORE" className="font-semibold text-black" minFontSize={20} />
                </div>
            </nav>
            <div className="relative w-full mx-5 hidden md:block">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2 pl-10 pr-4 rounded-full text-sm bg-white text-black focus:outline-none"
                />
                <HiOutlineSearch className="absolute left-3 top-2.5 text-gray-500 text-lg" />
            </div>
            <div className="flex items-center gap-4">
                <HiOutlineUser className="text-white text-2xl cursor-pointer hover:text-gray-300 transition" />
                <Link href={`/cart`} className="cursor-pointer hover:text-gray-300 transition">
                    <HiOutlineShoppingCart className="text-white text-2xl cursor-pointer hover:text-gray-300 transition" />
                </Link>

                <div className="flex items-center gap-2">
                    <Typography size="xl" type="Header" className="text-white font-semibold ">
                        {user ? `Welcome, ${user.name}` : "Welcome, Guest"}
                    </Typography>
                    <Button
                        onClick={() => {
                            Cookies.remove("access_token");
                            Cookies.remove("refresh_token");
                            Cookies.remove("user");
                            Cookies.remove("user_id");
                            router.push("/login");
                        }}

                        className="bg-[#e60012] hover:bg-[#c40010] text-white font-semibold text-sm px-4 py-1"
                        type="button"
                        color="Light"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}
