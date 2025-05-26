import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";


export default function Brands() {

    const brands = [
        {
            id: 1,
            name: "SUPREME",
            category: "streetwear",
            logo: "/image.png",
            description: "Iconic streetwear brand",
            isHot: true
        },
        {
            id: 2,
            name: "OFF-WHITE",
            category: "luxury",
            logo: "/image.png",
            description: "High-end fashion label",
            isHot: false
        },
        {
            id: 3,
            name: "BAPE",
            category: "streetwear",
            logo: "/image.png",
            description: "Japanese street fashion",
            isHot: true
        },
        {
            id: 4,
            name: "KITH",
            category: "trending",
            logo: "/image.png",
            description: "Modern lifestyle brand",
            isHot: false
        },
        {
            id: 5,
            name: "PALACE",
            category: "streetwear",
            logo: "/image.png",
            description: "London skateboard brand",
            isHot: true
        },
        {
            id: 6,
            name: "STONE ISLAND",
            category: "luxury",
            logo: "/image.png",
            description: "Italian premium brand",
            isHot: false
        }
    ];



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
        <Layout withNavbar withFooter >
            <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-red-900  mt-10 text-white">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-red-900"
                >
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-center"
                        >
                            <Typography type="Header" size="6xl" className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-red-400 font-bold tracking-wide">
                                PRAMSTORE
                            </Typography>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-2xl text-gray-300 mb-2 font-light text-center max-w-4xl"
                            >
                                Curated Streetwear Excellence
                            </motion.p>
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
                    <motion.div
                        animate={{
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-10 left-10 w-20 h-20 border-2 border-white/20 rotate-45"
                    />
                    <motion.div
                        animate={{
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rotate-45"
                    />
                    <motion.div
                        animate={{
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-10 right-10 w-20 h-20 border-2 border-white/20 rotate-45"
                    />
                </motion.section>


                {/* Brands Grid */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl bg-tra mx-auto px-4 py-10"
                >
                    <motion.div
                        variants={itemVariants}
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{
                            duration: 2,
                            repeat: 0,
                            ease: "easeInOut"

                        }}
                        initial="hidden"

                        whileInView={{ opacity: 1, y: 0 }}

                        className="text-center mb-10"
                    >
                        <Typography size="2xl" type="Header" className="font-black text-white tracking-wider mb-2">
                            FEATURED BRANDS
                        </Typography>
                        <motion.div

                            initial={{ width: 0 }}
                            whileInView={{ width: "6rem" }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-1 bg-red-600 mx-auto rounded-full" />
                    </motion.div>
                    {/* Brands Grid */}
                    <motion.section className="py-16">
                        <div className="max-w-6xl mx-auto px-4">
                            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {brands.map((brand) => (
                                    <motion.div
                                        key={brand.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: brand.id * 0.1 }}
                                        whileHover={{
                                            y: -12,
                                            scale: 1.02,
                                            rotateY: 5,
                                            transition: { type: "spring", stiffness: 400 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-gray-800 border border-gray-700 hover:border-red-600 rounded-lg overflow-hidden transition-all duration-300"
                                    >
                                        <div className="block">
                                            {brand.isHot && (
                                                <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
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
                                                    className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* Brand Info */}
                                            <div className="p-5">
                                                <Typography
                                                    type="Header"
                                                    size="lg"
                                                    className="text-white font-bold mb-2"
                                                >
                                                    {brand.name}
                                                </Typography>

                                                <Typography
                                                    type="Paragraph"
                                                    size="sm"
                                                    className="text-gray-400 mb-3"
                                                >
                                                    {brand.description}
                                                </Typography>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-red-600 font-bold uppercase tracking-wider">
                                                        {brand.category}
                                                    </span>

                                                    <Link href={`https://int.bape./`} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs font-bold tracking-wide transition-colors rounded">
                                                        EXPLORE
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.section>
                </motion.section>
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative py-20 mt-16 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-red-800 to-red-900">
                        <motion.div
                            animate={{
                                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-gray-800 via-red-800 to-red-900 bg-[length:400%_400%]"
                        />

                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [-20, 20, -20],
                                    x: [-10, 10, -10],
                                    rotate: [0, 180, 360],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 8 + i,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.5
                                }}
                                style={{
                                    left: `${10 + i * 12}%`,
                                    top: `${20 + (i % 3) * 20}%`
                                }}
                                className="absolute w-4 h-4 bg-white/10 rounded-full"
                            />
                        ))}
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <Typography type="Header" size="3xl" className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 font-black mb-4 tracking-wide">
                                Become a Brand Partner
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mb-4"
                        >

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-xl text-gray-300 font-light text-center"
                            >
                                Join our curated selection of premium streetwear brands and reach a global audience
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.08,
                                    boxShadow: "0 20px 40px rgba(255, 0, 20, 0.4)",
                                    y: -5
                                }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: [
                                        "0 0 0 rgba(168, 85, 247, 0)",
                                        "0 10px 20px rgba(255, 0, 0, 0.2)",
                                        "0 20px 40px rgba(255, 0, 20, 0.4)",
                                        "0 10px 20px rgba(255, 0, 40, 0.2)",
                                        "0 0 0 rgba(168, 85, 247, 0)"
                                    ]
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: 0,
                                    ease: "easeInOut"
                                }}
                                className="bg-red-700 text-white px-6 py-3 rounded-xl font-black"
                            >
                                APPLY NOW
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </Layout>
    );
}