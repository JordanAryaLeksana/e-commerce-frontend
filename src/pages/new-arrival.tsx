import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchItems } from "@/store/slice/itemsSlice";
import type { AppDispatch } from "@/store/store";
import { HiCurrencyDollar, HiOutlineHeart, HiFire, HiStar } from "react-icons/hi";
import { BsLightningFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import Link from "next/link";

export default function NewArrivals() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: products } = useSelector((state: RootState) => state.items);
    const loading = useSelector((state: RootState) => state.items.loading);
    const [selectedFilter, setSelectedFilter] = useState("all");

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token || token === "null" || token === "undefined") {
            window.location.href = "/login";
        } else {
            dispatch(fetchItems()).unwrap().then((res) => {
                console.log("New arrivals loaded:", res);
            });
        }
    }, [dispatch]);

    const filters = [
        { id: "all", label: "ALL DROPS", icon: HiFire },
        { id: "limited", label: "LIMITED", icon: BsLightningFill },
        { id: "exclusive", label: "EXCLUSIVE", icon: HiStar },
        { id: "featured", label: "FEATURED", icon: FaShippingFast }
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
        <Layout withNavbar withFooter withHeader>
            <div className="w-full min-h-screen bg-black mt-32 text-white">
                {/* Hero Section */}
                <motion.section 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-96 bg-gradient-to-r from-red-600 via-red-700 to-red-800 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-center"
                        >
                            <Typography size="6xl" type="Header" className="font-black tracking-wider mb-4 text-white drop-shadow-2xl">
                                NEW ARRIVALS
                            </Typography>
                            <Typography size="xl" type="Paragraph" className="font-bold text-white/90 mb-6 tracking-wide">
                                FRESH DROPS • EXCLUSIVE RELEASES • LIMITED STOCK
                            </Typography>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="inline-block bg-white text-red-600 px-8 py-3 font-black text-lg tracking-wider hover:bg-red-100 transition-all cursor-pointer"
                            >
                                SHOP NOW
                            </motion.div>
                        </motion.div>
                    </div>
                    
                    {/* Animated Background Elements */}
                    <motion.div
                        animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                            duration: 20, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="absolute -top-20 -right-20 w-40 h-40 border-4 border-white/20 rotate-45"
                    />
                    <motion.div
                        animate={{ 
                            rotate: [360, 0],
                            scale: [1, 0.8, 1]
                        }}
                        transition={{ 
                            duration: 15, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                        className="absolute -bottom-20 -left-20 w-32 h-32 border-4 border-white/20"
                    />
                </motion.section>

                {/* Filter Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="sticky top-32 z-20 bg-black/95 backdrop-blur-sm border-y border-red-600/30 py-6"
                >
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            {filters.map((filter) => (
                                <motion.button
                                    key={filter.id}
                                    onClick={() => setSelectedFilter(filter.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 px-6 py-3 font-black text-sm tracking-wider transition-all
                                        ${selectedFilter === filter.id 
                                            ? "bg-red-600 text-white border-2 border-red-600" 
                                            : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black"
                                        }`}
                                >
                                    <filter.icon className="text-lg" />
                                    {filter.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Products Grid */}
                <motion.section 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto px-4 py-12"
                >
                    <motion.div 
                        variants={itemVariants}
                        className="text-center mb-12"
                    >
                        <Typography size="3xl" type="Header" className="font-black text-white tracking-wider mb-2">
                            LATEST DROPS
                        </Typography>
                        <div className="w-24 h-1 bg-red-600 mx-auto" />
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
                            />
                        </div>
                    ) : (
                        <motion.div 
                            variants={containerVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {Array.isArray(products) && products.length > 0 ? (
                                products.slice(0, 12).map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -10 }}
                                        className="group relative bg-zinc-900 border-2 border-zinc-800 hover:border-red-600 transition-all duration-300 overflow-hidden"
                                    >
                                        <Link href={`/catalog/${product.type}/${product.name}`} className="block">
                                            {/* NEW Badge */}
                                            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 text-xs font-black tracking-wider">
                                                NEW
                                            </div>

                                            {/* Wishlist Button */}
                                            <motion.button 
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-red-600 transition-all"
                                            >
                                                <HiOutlineHeart className="text-lg" />
                                            </motion.button>

                                            {/* Product Image */}
                                            <div className="relative overflow-hidden bg-white">
                                                <Image
                                                    src={product.image || "/placeholder.png"}
                                                    alt={product.name}
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                
                                                {/* Overlay on hover */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        whileHover={{ scale: 1 }}
                                                        className="bg-white text-black px-6 py-2 font-black tracking-wider"
                                                    >
                                                        VIEW PRODUCT
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <Typography
                                                    size="lg"
                                                    type="Header"
                                                    className="font-black text-white tracking-wide mb-2 line-clamp-2"
                                                >
                                                    {product.name?.toUpperCase() || `PRODUCT ${product.id}`}
                                                </Typography>

                                                <Typography
                                                    size="sm"
                                                    type="Paragraph"
                                                    className="text-zinc-400 mb-4 line-clamp-2"
                                                >
                                                    {product.description || "Limited edition release"}
                                                </Typography>

                                                {/* Price and CTA */}
                                                <div className="flex items-center justify-between">
                                                    <Typography
                                                        size="xl"
                                                        type="Header"
                                                        className="flex items-center text-red-600 font-black"
                                                    >
                                                        <HiCurrencyDollar className="mr-1" />
                                                        {product.price || "TBA"}
                                                    </Typography>
                                                    
                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        className="bg-red-600 text-white px-4 py-2 text-xs font-black tracking-wider hover:bg-red-700 transition-colors cursor-pointer"
                                                    >
                                                        ADD TO CART
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div 
                                    variants={itemVariants}
                                    className="col-span-full text-center py-20"
                                >
                                    <Typography size="xl" type="Paragraph" className="text-zinc-500">
                                        NO NEW DROPS AVAILABLE
                                    </Typography>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </motion.section>

                {/* Newsletter Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-red-600 py-16"
                >
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <Typography size="3xl" type="Header" className="font-black text-white mb-4 tracking-wider">
                            STAY UPDATED
                        </Typography>
                        <Typography size="lg" type="Paragraph" className="text-white/90 mb-8">
                            Get notified about new drops, exclusive releases, and limited editions
                        </Typography>
                        
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="YOUR EMAIL"
                                className="flex-1 px-4 py-3 bg-white text-black font-bold tracking-wide placeholder-zinc-500 focus:outline-none"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-black text-white px-8 py-3 font-black tracking-wider hover:bg-zinc-800 transition-colors"
                            >
                                SUBSCRIBE
                            </motion.button>
                        </div>
                    </div>
                </motion.section>
            </div>
        </Layout>
    );
}