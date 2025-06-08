"use client";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useMemo } from "react";
import { fetchItems, getItemsByCategory } from "@/store/slice/itemsSlice";
import type { AppDispatch } from "@/store/store";
import { HiBookOpen, HiCurrencyDollar, HiOutlineHeart } from "react-icons/hi";
import { AiFillAppstore } from "react-icons/ai";
import { FaTools } from "react-icons/fa";
import { SiBlueprint } from "react-icons/si";
import { BooleanAction, setAction, setIsOpen } from "@/store/slice/booleanSlice";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
import { setToken } from "@/store/slice/authSlice";
import Cookies from "js-cookie";

export default function CartItems() {

    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [selectedTopupType, setSelectedTopupType] = useState("Token Listrik");
    const [topupNumber, setTopupNumber] = useState("");
    const [topupAmount , setTopupAmount] = useState("20rb");

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { action } = useSelector((state: RootState) => state.boolean);
    const products = useSelector((state: RootState) => state.items?.items || []);
    const filteredItems = useSelector((state: RootState) => state.items?.category || []);
    const token = useSelector((state: RootState) => state.auth?.token);
    const loading = useSelector((state: RootState) => state.items?.loading);
    const filteredProducts = useMemo(() => {
        if (!filteredItems || !Array.isArray(filteredItems)) return [];
        return filteredItems.filter((item) => item?.type === action);
    }, [filteredItems, action]);
    const HandleClickCategory = (category: BooleanAction) => {
        dispatch(setIsOpen(true));
        dispatch(setAction(category));
        dispatch(getItemsByCategory(category));
    };
    useEffect(() => {
        const cookieToken = Cookies.get("access_token");
        if (!token && !cookieToken || token === "undefined") {
            router.push("/login");
            return;
        }

        if (!token && cookieToken) {
            dispatch(setToken(cookieToken));   
            return;
        }
        setIsAuthChecked(true);
    }, [token, dispatch, router]);

    useEffect(() => {
        const cookieToken = Cookies.get("access_token");
        if (!token && cookieToken) {
            dispatch(setToken(cookieToken));
        }

        if (token || cookieToken && cookieToken !== "undefined") {
            setIsAuthChecked(true);
            dispatch(fetchItems());
        } else {
            router.push("/login");
        }
    }, [token, dispatch, router]);

    const handleBayar = () => {
        if (!topupNumber.trim()) {
            toast.error("Mohon masukkan nomor meter/ID Pelanggan");
            return;
        }
        toast.success(`Pembayaran ${selectedTopupType} ${topupAmount} untuk nomor ${topupNumber} berhasil!`);
    };

    // Show loading while checking authentication
    if (!isAuthChecked) {
        return (
            <Layout withNavbar withFooter withHeader>
                <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <Typography size="xl" type="Paragraph" className="text-gray-700">
                            Memuat...
                        </Typography>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout withNavbar withFooter withHeader>
            <div className="w-full min-h-screen bg-gray-50 mt-64 md:mt-52 p-4 lg:p-8 space-y-8">
               
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                >
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={true}
                        customDot={<CustomDot />}
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        keyBoardControl={true}
                        customTransition="all .8s ease"
                        transitionDuration={800}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                        <motion.section className="h-64 w-full bg-gradient-to-r from-slate-800 to-slate-600 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative z-10 text-center">
                                <Typography size="3xl" type="Header" className="text-white font-bold mb-2">
                                    Flash Sale 50%
                                </Typography>
                                <Typography size="lg" type="Paragraph" className="text-white/90">
                                    Promo terbatas hari ini!
                                </Typography>
                            </div>
                        </motion.section>

                        <motion.section className="h-64 w-full bg-gradient-to-r from-blue-800 to-indigo-700 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative z-10 text-center">
                                <Typography size="3xl" type="Header" className="text-white font-bold mb-2">
                                    New Arrivals
                                </Typography>
                                <Typography size="lg" type="Paragraph" className="text-white/90">
                                    Koleksi terbaru untuk Anda
                                </Typography>
                            </div>
                        </motion.section>

                        <motion.section className="h-64 w-full bg-gradient-to-r from-emerald-700 to-teal-700 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative z-10 text-center">
                                <Typography size="3xl" type="Header" className="text-white font-bold mb-2">
                                    Free Shipping
                                </Typography>
                                <Typography size="lg" type="Paragraph" className="text-white/90">
                                    Gratis ongkir ke seluruh Indonesia
                                </Typography>
                            </div>
                        </motion.section>
                    </Carousel>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-lg shadow-md border border-gray-200"
                >
                    <div className="flex flex-col lg:flex-row">
                        {/* Categories Section */}
                        <div className="flex-1 p-8 border-r border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
                                <Typography size="2xl" type="Header" className="text-gray-800 font-semibold">
                                    Kategori Pilihan
                                </Typography>
                            </div>

                            {/* Category Buttons */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3 p-4 rounded-lg bg-slate-800 text-white shadow-md hover:bg-slate-700 transition-colors"
                                >
                                    <AiFillAppstore className="text-xl" />
                                    <Typography size="sm" type="Paragraph" className="font-medium">
                                        Semua
                                    </Typography>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => HandleClickCategory(BooleanAction.Tshirts)}
                                    className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                                >
                                    <HiBookOpen className="text-blue-600 text-xl" />
                                    <Typography size="sm" type="Paragraph" className="text-gray-700 font-medium">
                                        T-Shirt
                                    </Typography>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => HandleClickCategory(BooleanAction.Hoodies)}
                                    className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                                >
                                    <FaTools className="text-blue-600 text-xl" />
                                    <Typography size="sm" type="Paragraph" className="text-gray-700 font-medium">
                                        Hoodies
                                    </Typography>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => HandleClickCategory(BooleanAction.Jackets)}
                                    className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                                >
                                    <SiBlueprint className="text-blue-600 text-xl" />
                                    <Typography size="sm" type="Paragraph" className="text-gray-700 font-medium">
                                        Jackets
                                    </Typography>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => HandleClickCategory(BooleanAction.Luxury)}
                                    className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                                >
                                    <SiBlueprint className="text-blue-600 text-xl" />
                                    <Typography size="sm" type="Paragraph" className="text-gray-700 font-medium">
                                        Luxury
                                    </Typography>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => HandleClickCategory(BooleanAction.Sweatshirts)}
                                    className="flex items-center gap-3 p-4 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
                                >
                                    <SiBlueprint className="text-blue-600 text-xl" />
                                    <Typography size="sm" type="Paragraph" className="text-gray-700 font-medium">
                                        Sweatshirts
                                    </Typography>
                                </motion.button>
                               
                            </div>

                            {/* Filtered Products */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {!loading && filteredProducts.length > 0 ? (
                                    filteredProducts.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                                        >
                                            <div className="p-4">
                                                <Image
                                                    src={item.image || "/placeholder.png"}
                                                    alt={item.name}
                                                    width={240}
                                                    height={160}
                                                    className="w-full h-32 object-cover rounded-md bg-gray-100"
                                                />
                                                <Typography
                                                    size="base"
                                                    type="Paragraph"
                                                    className="mt-3 text-gray-800 font-medium truncate"
                                                >
                                                    {item.name || `Product ${item.id}`}
                                                </Typography>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : loading ? (
                                    <div className="col-span-full flex justify-center">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="rounded-lg bg-gray-200 h-40 w-56"></div>
                                            <div className="rounded-lg bg-gray-200 h-40 w-56"></div>
                                            <div className="rounded-lg bg-gray-200 h-40 w-56"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-span-full text-center py-8">
                                        <Typography size="base" type="Paragraph" className="text-gray-500">
                                            Pilih kategori untuk melihat produk
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Top Up Section */}
                        <div className="lg:w-80 p-8 bg-gray-50">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
                                    <Typography size="lg" type="Header" className="text-gray-800 font-semibold">
                                        Top Up & Tagihan
                                    </Typography>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <Typography size="sm" type="Paragraph" className="text-gray-700 font-medium mb-2">
                                            Jenis Produk
                                        </Typography>
                                        <select
                                            value={selectedTopupType}
                                            onChange={(e) => setSelectedTopupType(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                        >
                                            <option>Token Listrik</option>
                                            <option>Tagihan Listrik</option>
                                            <option>Pulsa</option>
                                            <option>Paket Data</option>
                                        </select>
                                    </div>

                                    <div>
                                        <Typography size="sm" type="Paragraph" className="text-gray-700 font-medium mb-2">
                                            No. Meter/ID Pel
                                        </Typography>
                                        <input
                                            type="text"
                                            value={topupNumber}
                                            onChange={(e) => setTopupNumber(e.target.value)}
                                            placeholder="Masukkan Nomor"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <Typography size="sm" type="Paragraph" className="text-gray-700 font-medium mb-2">
                                            Nominal
                                        </Typography>
                                        <select
                                            value={topupAmount}
                                            onChange={(e) => setTopupAmount(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                                        >
                                            <option>20rb</option>
                                            <option>50rb</option>
                                            <option>100rb</option>
                                            <option>200rb</option>
                                            <option>500rb</option>
                                        </select>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={handleBayar}
                                        disabled={!topupNumber.trim()}
                                        className={`w-full rounded-md px-4 py-3 font-medium text-sm transition-all duration-200 ${topupNumber.trim()
                                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Bayar Sekarang
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Product Sections */}
                {["Berdasarkan Pencarianmu", "Semua Produk"].map((sectionTitle, sectionIndex) => (
                    <motion.section
                        key={sectionTitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: sectionIndex * 0.2 }}
                        className="bg-white rounded-lg shadow-md border border-gray-200 p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-slate-700 rounded-full"></div>
                            <Typography size="2xl" type="Header" className="text-gray-800 font-semibold">
                                {sectionTitle}
                            </Typography>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {loading ? (
                                Array.from({ length: 8 }).map((_, idx) => (
                                    <div key={idx} className="animate-pulse">
                                        <div className="bg-gray-200 rounded-lg h-64 w-full"></div>
                                    </div>
                                ))
                            ) : Array.isArray(products) && products.length > 0 ? (
                                products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group"
                                    >
                                        <Link href={`/catalog/${product.type}/${product.name}`} className="block">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm hover:bg-red-50 hover:text-red-500 transition-all duration-200 z-10"
                                            >
                                                <HiOutlineHeart className="text-base" />
                                            </motion.button>

                                            <div className="p-5">
                                                <div className="relative overflow-hidden rounded-md mb-4">
                                                    <Image
                                                        src={product.image || "/placeholder.png"}
                                                        alt={product.name}
                                                        width={240}
                                                        height={180}
                                                        className="w-full h-40 object-cover transition-transform duration-200 group-hover:scale-105"
                                                    />
                                                </div>

                                                <Typography
                                                    size="base"
                                                    type="Paragraph"
                                                    className="text-gray-800 font-medium mb-2 truncate"
                                                >
                                                    {product.name || `Product ${product.id}`}
                                                </Typography>

                                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                                    {product.description || "Deskripsi produk belum tersedia"}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <Typography
                                                        size="lg"
                                                        type="Paragraph"
                                                        className="flex items-center text-blue-600 font-semibold"
                                                    >
                                                        <HiCurrencyDollar className="mr-1" />
                                                        {product.price || "Hubungi"}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-8">
                                    <Typography size="base" type="Paragraph" className="text-gray-500">
                                        Tidak ada produk tersedia
                                    </Typography>
                                </div>
                            )}
                        </div>
                    </motion.section>
                ))}
            </div>
        </Layout>
    );
}

type CustomDotProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    active?: boolean;
    [key: string]: any;
};

const CustomDot = ({ onClick, ...rest }: CustomDotProps) => {
    const { active } = rest;
    return (
        <li>
            <button
                onClick={onClick}
                className={`w-2.5 h-2.5 mx-1 rounded-full transition-all duration-300 ${active
                    ? "bg-white shadow-md"
                    : "bg-white/60 hover:bg-white/80"
                    }`}
            />
        </li>
    );
};