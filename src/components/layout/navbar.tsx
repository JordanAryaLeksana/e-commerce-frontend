import React from "react";
import Typography from "../Typography/Typography";
import { IoPhonePortraitOutline } from "react-icons/io5";
import Link from "next/link";

const Links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/catalog" },
    { name: "On Sale", href: "/onsale" },
    { name: "New Arrivals", href: "/new-arrival" },
    { name: "Brands", href: "/brands" },
]

export default function Navbar() {
    return (
        <header className="h-auto w-full bg-zinc-900">
            <div className="flex flex-row justify-between gap-3 p-2 items-center ">
                <Typography type="Header" size="base" className="flex m-1 flex-row items-center gap-2 text-white font-bold ml-4">
                    <span><IoPhonePortraitOutline size={20} className="text-white" /></span>
                    Soon Available on Play Store!
                </Typography>
                <div className="flex flex-row gap-5 justify-evenly items-center">
                    {Links.map((link) => (
                        <ul key={link.name} className="">
                            <li className="text-white font-semibold text-sm">
                                <Link className="mr-2"  href={link.href}>{link.name}</Link>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </header>
    )
}