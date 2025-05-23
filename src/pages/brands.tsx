import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiStar, HiFire, HiTrendingUp } from "react-icons/hi";
import { BsLightningFill } from "react-icons/bs";

export default function Brands() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = [
        { id: "all", label: "ALL BRANDS", icon: HiFire },
        { id: "streetwear", label: "STREETWEAR", icon: BsLightningFill },
        { id: "luxury", label: "LUXURY", icon: HiStar },
        { id: "trending", label: "TRENDING", icon: HiTrendingUp }
    ];

    const brands = [
        {
            id: 1,
            name: "SUPREME",
            category: "streetwear",
            logo: "/placeholder.png",
            description: "Iconic streetwear brand",
            isHot: true
        },
        {
            id: 2,
            name: "OFF-WHITE",
            category: "luxury",
            logo: "/placeholder.png",
            description: "High-end fashion label",
            isHot: false
        },
        {
            id: 3,
            name: "BAPE",
            category: "streetwear",
            logo: "/placeholder.png",
            description: "Japanese street fashion",
            isHot: true
        },
        {
            id: 4,
            name: "KITH",
            category: "trending",
            logo: "/placeholder.png",
            description: "Modern lifestyle brand",
            isHot: false
        },
        {
            id: 5,
            name: "PALACE",
            category: "streetwear",
            logo: "/placeholder.png",
            description: "London skateboard brand",
            isHot: true
        },
        {
            id: 6,
            name: "STONE ISLAND",
            category: "luxury",
            logo: "/placeholder.png",
            description: "Italian premium brand",
            isHot: false
        }
    ];

    const filteredBrands = selectedCategory === "all" 
        ? brands 
        : brands.filter(brand => brand.category === selectedCategory);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <Layout withNavbar withFooter withHeader>
            <div className="w-full min-h-screen bg-black mt-32 text-white">
                {/* Hero Section */}
                <motion.section 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative h-80 bg-gradient-to-r from-red-600 to-red-800 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-center"
                        >
                            <Typography size="5xl" type="Header" className="font-black tracking-wider mb-3 text-white">
                                BRANDS
                            </Typography>
                            <Typography size="lg" type="Paragraph" className="font-bold text-white/90 tracking-wide">
                                CURATED STREETWEAR • PREMIUM LABELS
                            </Typography>
                        </motion.div>
                    </div>

                    {/* Simple animated element */}
                    <motion.div
                        animate={{ 
                            rotate: [0, 360]
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rotate-45"
                    />
                </motion.section>

                {/* Filter Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="sticky top-32 z-20 bg-black/95 backdrop-blur-sm border-y border-red-600/30 py-4"
                >
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((category) => (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`flex items-center gap-2 px-5 py-2 font-black text-sm tracking-wider transition-all
                                        ${selectedCategory === category.id 
                                            ? "bg-red-600 text-white border border-red-600" 
                                            : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
                                        }`}
                                >
                                    <category.icon className="text-base" />
                                    {category.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Brands Grid */}
                <motion.section 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto px-4 py-10"
                >
                    <motion.div 
                        variants={itemVariants}
                        className="text-center mb-10"
                    >
                        <Typography size="2xl" type="Header" className="font-black text-white tracking-wider mb-2">
                            FEATURED BRANDS
                        </Typography>
                        <div className="w-16 h-1 bg-red-600 mx-auto" />
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredBrands.map((brand) => (
                            <motion.div
                                key={brand.id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="group relative bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all duration-300"
                            >
                                <Link href={`/brands/${brand.name.toLowerCase()}`} className="block">
                                    {/* Hot Badge */}
                                    {brand.isHot && (
                                        <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-2 py-1 text-xs font-black">
                                            HOT
                                        </div>
                                    )}

                                    {/* Brand Logo */}
                                    <div className="relative h-48 bg-white overflow-hidden">
                                        <Image
                                            src={brand.logo}
                                            alt={brand.name}
                                            width={300}
                                            height={200}
                                            className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                                        />
                                        
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-white text-black px-4 py-2 text-sm font-black tracking-wide">
                                                VIEW BRAND
                                            </div>
                                        </div>
                                    </div>

                                    {/* Brand Info */}
                                    <div className="p-5">
                                        <Typography
                                            size="lg"
                                            type="Header"
                                            className="font-black text-white tracking-wide mb-2"
                                        >
                                            {brand.name}
                                        </Typography>

                                        <Typography
                                            size="sm"
                                            type="Paragraph"
                                            className="text-zinc-400 mb-3"
                                        >
                                            {brand.description}
                                        </Typography>

                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-red-600 font-bold tracking-wider uppercase">
                                                {brand.category}
                                            </div>
                                            
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="bg-red-600 text-white px-3 py-1 text-xs font-black tracking-wide hover:bg-red-700 transition-colors"
                                            >
                                                EXPLORE
                                            </motion.div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* CTA Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900 py-12 border-t border-zinc-800"
                >
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <Typography size="2xl" type="Header" className="font-black text-white mb-3 tracking-wide">
                            BECOME A BRAND PARTNER
                        </Typography>
                        <Typography size="base" type="Paragraph" className="text-zinc-400 mb-6">
                            Join our curated selection of premium streetwear brands
                        </Typography>
                        
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="bg-red-600 text-white px-8 py-3 font-black tracking-wide hover:bg-red-700 transition-colors"
                        >
                            APPLY NOW
                        </motion.button>
                    </div>
                </motion.section>
            </div>
        </Layout>
    );
}