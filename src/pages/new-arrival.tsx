import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { fetchItems } from "@/store/slice/itemsSlice";
import type { AppDispatch } from "@/store/store";
import { HiCurrencyDollar, HiOutlineHeart, HiFire, HiStar, HiArrowCircleDown } from "react-icons/hi";
import { BsLightningFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import Link from "next/link";

export default function NewArrivals() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: products } = useSelector((state: RootState) => state.items);
    const loading = useSelector((state: RootState) => state.items.loading);
    const [selectedFilter, setSelectedFilter] = useState("all");

    useEffect(() => {
        dispatch(fetchItems()).unwrap().then((res) => {
            console.log("New arrivals loaded:", res);
        });
    }, [dispatch]);

    const filters = [
        { id: "all", label: "All Drops", icon: HiFire },
        { id: "limited", label: "Limited", icon: BsLightningFill },
        { id: "exclusive", label: "Exclusive", icon: HiStar },
        { id: "featured", label: "Featured", icon: FaShippingFast }
    ];


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };
    const ref = useRef<HTMLDivElement>(null);
    const handleScroll = () => {
        if (ref.current) {
            const scrollY = window.scrollY;
            ref.current.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    };
    const floatingAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <Layout withNavbar withFooter>

            <section className="h-full pt-32 w-full relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
                <div className="min-h-screen relative overflow-hidden">

                    <div className="absolute inset-0 opacity-5">
                        <div className="w-full h-full bg-repeat" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }} />
                    </div>

                    <section className="h-full w-full relative z-10">
                        <div className="flex flex-col items-center justify-center h-full w-full mt-10 px-4">
                            {/* Elegant Brand Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="text-center mb-8"
                            >
                                <motion.div
                                    animate={floatingAnimation}
                                    className="inline-block"

                                >
                                    <Typography type="Header" size="6xl" className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-red-400 font-bold tracking-wide">
                                        NEW ARRIVALS
                                    </Typography>
                                </motion.div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                                    className="h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-4"
                                />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-2xl text-gray-300 mb-2 font-light text-center max-w-4xl"
                            >
                                Fresh Drops & Exclusive Releases
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="text-lg text-gray-400 mb-12 text-center max-w-2xl font-light"
                            >
                                Limited stock • Premium quality • Latest trends
                            </motion.p>

                            {/* Elegant Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 0.8 }}
                                className="flex flex-wrap justify-center gap-12 mt-8 text-gray-300"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl font-light text-white mb-2">Fresh</div>
                                    <div className="text-sm text-gray-400 tracking-wide">Daily Drops</div>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl font-light text-white mb-2">Limited</div>
                                    <div className="text-sm text-gray-400 tracking-wide">Edition</div>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl font-light text-white mb-2">Premium</div>
                                    <div className="text-sm text-gray-400 tracking-wide">Quality</div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleScroll}
                        transition={{ delay: 2.2, duration: 0.8 }}
                        className="absolute bottom-[2%] md:bottom-[10%] lg:bottom-[15%] left-[50%] -translate-x-1/2 flex flex-col justify-center items-center gap-3"
                    >
                        <p className="text-sm text-gray-400 font-light tracking-widest">
                            EXPLORE COLLECTION
                        </p>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <HiArrowCircleDown className="text-gray-400 text-2xl" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="sticky top-10 z-20 bg-black/95 backdrop-blur-sm border-y border-gray-800 py-8"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {filters.map((filter) => (
                            <motion.button
                                key={filter.id}
                                onClick={() => setSelectedFilter(filter.id)}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className={`flex md:text-nowrap text-wrap items-center gap-2 px-6 py-3 font-light text-sm tracking-wider transition-all duration-500 rounded-sm
                                    ${selectedFilter === filter.id
                                        ? "bg-gradient-to-r from-red-700 to-red-800 text-white border border-red-600/30"
                                        : "bg-transparent text-gray-300 border border-gray-600 hover:border-red-600 hover:bg-red-900/20 hover:text-white"
                                    }`}
                            >
                                <filter.icon className="text-lg" />
                                {filter.label}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.section>

            <motion.section
                className="min-h-screen w-full relative bg-gradient-to-b from-black via-gray-900 to-gray-800 py-24"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-red-400 font-light tracking-wide mb-4">
                            Latest Collection
                        </h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "200px" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                            className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6"
                        />
                        <p className="text-gray-400 font-light">
                            Discover the newest additions to our curated selection
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full"
                            />
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {Array.isArray(products) && products.length > 0 ? (
                                products.slice(0, 12).map((product, idx) => (
                                    <motion.div
                                        key={product.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -8, scale: 1.02 }}

                                        transition={{ duration: 0.9, ease: "easeOut" }}
                                        className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-red-900/50"
                                    >
                                        <Link href={`/catalog/${product.type}/${product.name}`} className="block">
                                            {/* Subtle Badges */}
                                            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                                <div className="bg-gradient-to-r from-red-800 to-red-900 text-white px-3 py-1 text-xs font-light tracking-wider rounded-sm">
                                                    New
                                                </div>
                                                {idx < 3 && (
                                                    <div className="bg-gray-800/90 backdrop-blur-sm text-gray-300 px-3 py-1 text-xs font-light tracking-wider rounded-sm flex items-center gap-1">
                                                        <HiFire className="text-sm text-red-500" />
                                                        Hot
                                                    </div>
                                                )}
                                            </div>

                                            {/* Elegant Wishlist Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 text-gray-400 hover:text-red-400 transition-colors duration-300"
                                            >
                                                <HiOutlineHeart className="text-lg" />
                                            </motion.button>


                                            <div className="relative overflow-hidden bg-gray-800 rounded-t-lg">
                                                <Image
                                                    src={product.image || "/placeholder.png"}
                                                    alt={product.name}
                                                    width={400}
                                                    height={400}
                                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                                                />


                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }}
                                                        whileHover={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="text-white text-sm font-light tracking-wide"
                                                    >
                                                        View Details
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <p className="text-xs text-red-400 font-light tracking-wider mb-2">
                                                    {product.type || "STREETWEAR"}
                                                </p>

                                                <h3 className="text-lg font-light text-white mb-4 line-clamp-2 hover:text-gray-300 transition-colors duration-300">
                                                    {product.name?.toUpperCase() || `PRODUCT ${product.id}`}
                                                </h3>

                                                {/* Price and CTA */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center text-white font-light text-xl">
                                                        <HiCurrencyDollar className="mr-1 text-gray-400" />
                                                        {product.price || "TBA"}
                                                    </div>

                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 text-xs font-light tracking-wide transition-all duration-300 cursor-pointer rounded-sm"
                                                    >
                                                        Add to Cart
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
                                    <Typography size="xl" type="Paragraph" className="text-gray-500 font-light">
                                        No new arrivals available at the moment
                                    </Typography>
                                    <p className="text-gray-600 font-light mt-4">
                                        Check back soon for fresh drops
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {Array.isArray(products) && products.length > 12 && (
                        <motion.div
                            className="text-center mt-20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                className="bg-transparent border border-gray-600 hover:border-red-600 hover:bg-red-900/20 text-gray-300 hover:text-white px-12 py-4 font-light tracking-wide transition-all duration-500 rounded-sm"
                            >
                                Load More Products
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </motion.section>
           
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className=" bg-gradient-to-r from-black via-gray-900 to-black py-24 relative overflow-hidden"
            >
                {/* Subtle Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full bg-repeat" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }} />
                </div>
                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <Typography size="3xl" type="Header" className="font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-red-400 tracking-wide mb-6">
                            Stay Updated
                        </Typography>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100px" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                            className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-8"
                        />
                    </motion.div>

                    <Typography size="lg" type="Paragraph" className="text-gray-400 mb-12 font-light">
                        Get notified about new drops and exclusive releases
                    </Typography>
                        <Link href="/subscribe">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-cyan-900 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-cyan-500/25"
                            >
                                SUBSCRIBE NOW
                            </motion.button>
                        </Link>
                    <p className="text-sm text-gray-500 mt-8 font-light">
                        No spam, unsubscribe at any time
                    </p>
                </div>
            </motion.section>
        </Layout>
    );
}