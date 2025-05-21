"use client"

import Typography from '../Typography/Typography'
import { HiOutlineShieldCheck, HiPhone, HiLocationMarker, HiMail } from 'react-icons/hi'
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="bg-black text-white py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                
                {/* Logo & Description */}
                <div>
                    <Typography as="h1" size="2xl" type="Header" className="font-bold text-red-600">
                        PRAMSTORE
                    </Typography>
                    <Typography size="base" type="Paragraph" className="mt-2 text-gray-300">
                        Streetwear brand that blends art, fashion, and lifestyle. Shop exclusive drops and collabs.
                    </Typography>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                    <Typography as="h2" size="xl" type="Header" className="text-white font-semibold">
                        Contact
                    </Typography>
                    <div className="flex items-start gap-2">
                        <HiPhone className="mt-1" />
                        <Typography size="base" type="Paragraph">+62 812-3456-7890</Typography>
                    </div>
                    <div className="flex items-start gap-2">
                        <HiMail className="mt-1" />
                        <Typography size="base" type="Paragraph">support@supreme.id</Typography>
                    </div>
                    <div className="flex items-start gap-2">
                        <HiLocationMarker className="mt-1" />
                        <Typography size="base" type="Paragraph">Jakarta, Indonesia</Typography>
                    </div>
                </div>

                {/* Social Media */}
                <div>
                    <Typography as="h2" size="xl" type="Header" className="text-white font-semibold mb-3">
                        Follow Us
                    </Typography>
                    <div className="flex gap-4">
                        <a href="#" className="text-gray-300 hover:text-white"><FaInstagram size={24} /></a>
                        <a href="#" className="text-gray-300 hover:text-white"><FaTwitter size={24} /></a>
                        <a href="#" className="text-gray-300 hover:text-white"><FaFacebookF size={24} /></a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10 text-center border-t border-gray-700 pt-6">
                <Typography size="sm" type="Paragraph" className="text-gray-400">
                    &copy; {new Date().getFullYear()} Supreme Indonesia. All rights reserved.
                </Typography>
            </div>
        </footer>
    )
}
