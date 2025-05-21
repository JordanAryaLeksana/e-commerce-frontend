
'use client';
import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";
import { setJenisTopup, setNominalTopup, setNomorTopup } from "@/store/slice/topupSlice";
import { fetchItems } from "@/store/slice/itemsSlice";
import type { AppDispatch } from "@/store/store";

export default function CartItems() {
    const { jenisTopup, nomorTopup, nominalTopup } = useSelector(
        (state: RootState) => state.topup
    );
    const dispatch = useDispatch<AppDispatch>();
    const { items: products } = useSelector((state: RootState) => state.items);
    const loading = useSelector((state: RootState) => state.items.loading);
    const tabs = ["Listrik", "P2ulsa", "Data"];
    console.log("Products:", products);
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token || token === "null" || token === "undefined") {
            window.location.href = "/login";
            console.log("Token tidak ada, redirecting to login", token);
        } else {
            dispatch(fetchItems()).unwrap().then((res) => {
                console.log("Items fetched:", res);

            });
        }
    }, [dispatch]);

    const handleBayar = () => {
        console.log("Bayar dengan data:", { jenisTopup, nomorTopup, nominalTopup });
    };

    return (
        <Layout withNavbar withFooter withHeader>
            <div className="w-full min-h-screen bg-zinc-900 mt-32 p-10 space-y-10 text-white">

                {/* Carousel */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="h-60 w-full rounded-2xl bg-red-600 flex items-center justify-center"
                >
                    <Typography size="xl" type="Header">Carousel Section</Typography>
                </motion.section>

                {/* Kategori Pilihan & Top Up */}
                <motion.div className="w-full flex flex-col lg:flex-row gap-5 rounded-2xl bg-white p-6 text-black">
                    {/* Kategori Pilihan */}
                    <motion.div className="flex flex-col w-full lg:w-1/2">
                        <Typography size="2xl" type="Header" className="text-zinc-900 mb-4">Kategori Pilihan</Typography>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-neutral-100 rounded-xl h-24 flex items-center justify-center"
                                >
                                    <Typography size="base" type="Paragraph" className="text-zinc-700 font-medium">Kategori {idx + 1}</Typography>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Top Up & Tagihan */}
                    <motion.div className="flex flex-col w-full lg:w-1/2">
                        <div className="flex justify-start items-center gap-3">
                            <Typography size="2xl" type="Header" className="text-zinc-900">Top Up & Tagihan</Typography>
                            <button className="text-red-600 text-sm font-semibold hover:underline">Lihat Semua</button>
                        </div>

                        {/* Tabs */}
                        <motion.div className="flex border-b border-zinc-200">
                            {tabs.map((tab, idx) => {
                                const tabKey = tab.toLowerCase();

                                return (
                                    <button
                                        key={idx}

                                        className={`px-4 py-2 font-semibold text-sm transition-al`}
                                    >
                                        <Typography size="sm" type="Paragraph">{tab}</Typography>
                                    </button>
                                );
                            })}
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
                    <section className="w-full h-auto rounded-2xl bg-white p-10 text-black">
                        <Typography size="2xl" type="Header" className="text-zinc-900 mb-4">Berdasarkan Pencarianmu</Typography>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {Array.isArray(products) && products.length > 0 ? (
                                products.map((product, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-neutral-100 h-40 rounded-md flex items-center justify-center"
                                    >
                                        <Typography size="base" type="Paragraph" className="text-zinc-700">{product.name || `Product ${idx + 1}`}</Typography>
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
                </motion.div>



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
                                        className="bg-neutral-100 h-40 rounded-md flex items-center justify-center"
                                    >
                                        <Typography size="base" type="Paragraph" className="text-black">
                                            {product.description || `Product ${product.id}`}
                                        </Typography>
                                        <Image
                                            src={product.image || "/placeholder.png"}
                                            alt={product.name}
                                            width={100}
                                            height={100}
                                            className="rounded-md"
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <Typography size="base" type="Paragraph" className="text-zinc-700">Tidak ada produk tersedia</Typography>
                            )
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
}