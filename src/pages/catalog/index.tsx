import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";
import { setJenisTopup, setNominalTopup, setNomorTopup } from "@/store/slice/topupSlice";
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

export default function CartItems() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
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
    const { jenisTopup, nomorTopup, nominalTopup } = useSelector(
        (state: RootState) => state.topup
    );
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const { action } = useSelector((state: RootState) => state.boolean);
    const { items: products } = useSelector((state: RootState) => state.items);
    const filteredItems = useSelector((state: RootState) => state.items.category)
    const filteredProducts = filteredItems.filter((item) => item.type === action);
    const loading = useSelector((state: RootState) => state.items.loading);
    const HandleClickCategory = (category: BooleanAction) => {
        dispatch(setIsOpen(true));
        dispatch(setAction(category));
        dispatch(getItemsByCategory(category));
    }

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token || token === "null" || token === "undefined") {
            router.push("/login");
        } else {
            dispatch(fetchItems()).unwrap().then((res) => {
                // console.log("Items fetched:", res);

            });
        }
    }, [dispatch]);


    const handleBayar = () => {
        // console.log("Bayar dengan data:", { jenisTopup, nomorTopup, nominalTopup });
        toast.dismiss("Maaf, Page ini masih dalam tahap developtment")
    };

    return (
        <Layout withNavbar withFooter withHeader>
            <div className="w-full min-h-screen bg-zinc-900 mt-32 p-10 space-y-10 text-white">
                {/* Carousel */}
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    customDot={<CustomDot />}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all .7s ease"
                    transitionDuration={2000}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}

                >

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="h-60 w-full rounded-2xl bg-red-600 flex items-center justify-center"
                    >
                        4
                    </motion.section>
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="h-60 w-full rounded-2xl bg-green-500 flex items-center justify-center"
                    >
                        1
                    </motion.section>
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="h-60 w-full rounded-2xl bg-blue-600 flex items-center justify-center"
                    >
                        2
                    </motion.section>
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="h-60 w-full rounded-2xl bg-yellow-600 flex items-center justify-center"
                    >
                        3
                    </motion.section>
                </Carousel>

                {/* Kategori Pilihan & Top Up */}
                <motion.div className="w-full flex flex-col gap-5 rounded-2xl bg-white p-6 text-black">
                    {/* Kategori Pilihan */}
                    <motion.div className="flex flex-col md:flex-row w-full ">
                        <motion.div className="flex flex-col w-full lg:w-1/2">
                            <Typography size="2xl" type="Header" className="text-zinc-900 mb-4">Kategori Pilihan</Typography>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {!loading && filteredProducts.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="w-60 bg-white rounded-2xl border-[1.5px] border-gray-300 shadow-lg hover:shadow-red-400/60 transition-shadow duration-300 relative overflow-hidden"
                                    >
                                        <div className="p-4">
                                            <Image
                                                src={item.image || "/placeholder.png"}
                                                alt={item.name}
                                                width={240}
                                                height={180}
                                                className="w-full h-40 object-contain rounded-md bg-gray-100"
                                            />
                                            <Typography
                                                size="xl"
                                                type="Paragraph"
                                                className="mt-3 text-black font-heading font-extrabold tracking-tight"
                                            >
                                                {item.name || `Product ${item.id}`}
                                            </Typography>
                                        </div>
                                    </motion.div>
                                ))}
                                {loading && (
                                    <Typography size="base" type="Paragraph" className="text-zinc-700">Loading...</Typography>
                                )}
                            </div>
                        </motion.div>

                        {/* Top Up & Tagihan */}
                        <motion.div className="flex flex-col w-full lg:w-1/2">
                            <div className="flex justify-start items-center gap-3">
                                <Typography size="2xl" type="Header" className="text-zinc-900">Top Up & Tagihan</Typography>
                                <button className="text-red-600 text-sm font-semibold hover:underline">Lihat Semua</button>
                            </div>

                            {/* Tabs */}
                            <motion.div className="flex border border-zinc-200">
                            </motion.div>

                            {/* Form */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4"
                            >
                                <div className="flex flex-col">
                                    <Typography size="sm" type="Paragraph" className="text-zinc-700 font-semibold mb-1">Jenis Produk Listrik</Typography>
                                    <select
                                        value={jenisTopup}
                                        onChange={(e) => setJenisTopup(e.target.value)}
                                        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800"
                                    >
                                        <option>Token Listrik</option>
                                        <option>Tagihan Listrik</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <Typography size="sm" type="Paragraph" className="text-zinc-700 font-semibold mb-1">No. Meter/ID Pel</Typography>
                                    <input
                                        type="text"
                                        value={nomorTopup}
                                        onChange={(e) => setNomorTopup(e.target.value)}
                                        placeholder="Masukkan Nomor"
                                        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Typography size="sm" type="Paragraph" className="text-zinc-700 font-semibold mb-1">Nominal</Typography>
                                    <select
                                        value={nominalTopup}
                                        onChange={(e) => setNominalTopup(e.target.value)}
                                        className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800"
                                    >
                                        <option>20rb</option>
                                        <option>50rb</option>
                                        <option>100rb</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={handleBayar}
                                        disabled={!nomorTopup}
                                        className={`w-full rounded-md px-4 py-2 font-semibold text-sm transition-all ${nomorTopup
                                            ? "bg-red-600 text-white hover:bg-red-700"
                                            : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                                            }`}
                                    >
                                        <Typography size="sm" type="Paragraph">Bayar</Typography>
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-2 mt-4">
                        <motion.div className="flex flex-row gap-2 border justify-center border-red-700 rounded-sm py-1 px-2 bg-red-700">
                            <AiFillAppstore className="text-white text-2xl" />
                            <Typography size="xl" type="Paragraph" className={`text-white font-black`}>Category</Typography>
                        </motion.div>

                        <button className="flex items-center  gap-2 px-2 py-1 rounded-sm text-red-600  border border-red-700" onClick={() => HandleClickCategory(BooleanAction.books)}>
                            <HiBookOpen className="text-red-600 text-2xl" />
                            <Typography size="base" type="Paragraph" className={`text-red-600 font-semibold`}>Books</Typography>
                        </button>
                        <button className="flex items-center gap-2 px-2 py-1 rounded-sm  text-red-600  border border-red-700" onClick={() => HandleClickCategory(BooleanAction.tools)}>
                            <FaTools className="text-red-600 text-2xl" />
                            <Typography size="base" type="Paragraph" className={`text-red-600 font-semibold`}>Tools</Typography>
                        </button>
                        <button className="flex items-center gap-2 px-2 py-1 rounded-sm text-red-600  border border-red-700" onClick={() => HandleClickCategory(BooleanAction.projects)}>
                            <SiBlueprint className="text-red-600 text-2xl" />
                            <Typography size="base" type="Paragraph" className={`text-red-600 font-semibold`}>Blueprints</Typography>
                        </button>
                    </div>
                </motion.div>
                <section className="w-full h-auto rounded-2xl bg-white p-10 text-black">
                    <Typography size="2xl" type="Header" className="text-zinc-900 mb-4">Berdasarkan Pencarianmu</Typography>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    whileHover={{ scale: 1.05 }}
                                    className="max-w-60 w-full bg-white rounded-2xl border-[1.5px] border-gray-300 shadow-lg hover:shadow-red-400/60 transition-shadow duration-300 relative overflow-hidden"
                                >
                                    <Link href={`/catalog/${product.type}/${product.name}`} className="flex flex-row w-full h-auto ">
                                        {/* Tombol bookmark / simpan */}
                                        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-600 hover:text-white transition-colors">
                                            <HiOutlineHeart className="text-lg" />
                                        </button>

                                        <div className="p-4">
                                            {/* Gambar Produk */}
                                            <Image
                                                src={product.image || "/placeholder.png"}
                                                alt={product.name}
                                                width={240}
                                                height={180}
                                                className="w-full h-40 object-contain rounded-md bg-gray-100"
                                            />

                                            {/* Nama Produk */}
                                            <Typography
                                                size="xl"
                                                type="Paragraph"
                                                className="mt-3 text-black font-heading font-extrabold tracking-tight"
                                            >
                                                {product.name || `Product ${product.id}`}
                                            </Typography>

                                            {/* Deskripsi singkat */}
                                            <p className="text-sm text-gray-500 font-body mt-1">
                                                {product.description || "Deskripsi produk belum tersedia"}
                                            </p>

                                            {/* Harga dan label */}
                                            <div className="mt-3 flex items-center justify-between">
                                                <Typography
                                                    size="2xl"
                                                    type="Paragraph"
                                                    className="flex items-center text-red-600 font-bold"
                                                >
                                                    <HiCurrencyDollar className="mr-1" />
                                                    {product.price || `-`}
                                                </Typography>

                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-neutral-100 h-40 rounded-md flex items-center justify-center"
                            >
                                <Typography size="base" type="Paragraph" className="text-zinc-700">Loading products...</Typography>
                            </motion.div>
                        )}
                    </div>
                </section>



                {/* Semua Produk */}
                <section className="w-full rounded-2xl bg-white p-6 text-black">
                    <Typography size="2xl" type="Header" className="text-zinc-900 mb-4">Semua Produk</Typography>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {loading ? (
                            <Typography size="base" type="Paragraph" className="text-zinc-700">Loading...</Typography>
                        ) : (
                            Array.isArray(products) && products.length > 0 ? (
                                products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="max-w-60 w-full bg-white rounded-2xl border-[1.5px] border-gray-300 shadow-lg hover:shadow-red-400/60 transition-shadow duration-300 relative overflow-hidden"
                                    >
                                        {/* Tombol bookmark / simpan */}
                                        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-600 hover:text-white transition-colors">
                                            <HiOutlineHeart className="text-lg" />
                                        </button>

                                        <div className="p-4">
                                            {/* Gambar Produk */}
                                            <Image
                                                src={product.image || "/placeholder.png"}
                                                alt={product.name}
                                                width={240}
                                                height={180}
                                                className="w-full h-40 object-contain rounded-md bg-gray-100"
                                            />

                                            {/* Nama Produk */}
                                            <Typography
                                                size="xl"
                                                type="Paragraph"
                                                className="mt-3 text-black font-heading font-extrabold tracking-tight"
                                            >
                                                {product.name || `Product ${product.id}`}
                                            </Typography>

                                            {/* Deskripsi singkat */}
                                            <p className="text-sm text-gray-500 font-body mt-1">
                                                {product.description || "Deskripsi produk belum tersedia"}
                                            </p>

                                            {/* Harga dan label */}
                                            <div className="mt-3 flex items-center justify-between">
                                                <Typography
                                                    size="2xl"
                                                    type="Paragraph"
                                                    className="flex items-center text-red-600 font-bold"
                                                >
                                                    <HiCurrencyDollar className="mr-1" />
                                                    {product.price || `-`}
                                                </Typography>

                                            </div>
                                        </div>
                                    </motion.div>

                                ))
                            ) : (
                                <Typography size="base" type="Paragraph" className="text-zinc-700">Tidak ada produk tersedia</Typography>
                            )
                        )}
                    </div>
                </section>
            </div >
        </Layout >
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
                className={`w-3 h-3 mx-1 rounded-full border 
          ${active ? "bg-white border-white" : "bg-transparent border-white/50"}`}
            />
        </li>
    );
};