import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchItems } from "@/store/slice/itemsSlice";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineHeart, HiCurrencyDollar, HiHeart, HiShoppingCart, HiFire, HiClock, HiTag, HiFilter } from "react-icons/hi";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addCollaborator } from "@/store/slice/collabsSlice";
import DismissableToast from "@/components/animated/ToastContainer";
import toast from "react-hot-toast";

type FormValues = {
    name: string;
    email: string;
    role: "ecommerce_expert" | "supplier" | "influencer" | "developer";
};

const validationSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(100, "Name must be less than 100 characters")
        .nonempty("Name is required"),
    email: z
        .string()
        .email("Invalid email address")
        .max(100, "Email must be less than 100 characters")
        .nonempty("Email is required"),
    role: z.enum(["ecommerce_expert", "supplier", "influencer", "developer"], {
        required_error: "Role is required"
    }),
});

const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

export default function OnSale() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: products, loading } = useSelector((state: RootState) => state.items);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('discount');
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const methods = useForm<FormValues>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "ecommerce_expert",
        },
    });
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods
    
    const submit = async (data: FormValues) => {
        try {
            await dispatch(addCollaborator(data)).unwrap();
            toast.success("We've sent you an email! Thank you for joining our community.");
            methods.reset();
        } catch (error) {
            toast.error("Failed to subscribe. Please try again later.");
        }
    }

    const saleProducts = products?.map((product, index) => ({
        ...product,
        originalPrice: parseInt(String(product.price) || "100") + Math.floor(Math.random() * 100) + 50,
        discount: [20, 30, 40, 50, 60][index % 5],
        timeLeft: Math.floor(Math.random() * 48) + 1, // hours
        category: ['clothing', 'accessories', 'footwear'][index % 3]
    })) || [];

    const filteredProducts = filter === 'all'
        ? saleProducts
        : saleProducts.filter(product => product.category === filter);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'discount') return b.discount - a.discount;
        if (sortBy === 'price') return a.price - b.price;
        if (sortBy === 'time') return a.timeLeft - b.timeLeft;
        return 0;
    });

    const toggleFavorite = (productId: number) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <Layout withNavbar withFooter>
            <div/>
            <div className="w-full min-h-screen bg-gradient-to-r from-black via-gray-900 to-black  mt-10 text-white">
                {/* Hero Section - Keep Original */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 py-20"
                >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, -5, 5, 0],
                                        color: ['#FBBF24', '#EF4444', '#F97316', '#FBBF24']
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <HiFire className="text-4xl" />
                                </motion.div>

                                <Typography size="4xl" type="Header" className="font-black tracking-tighter">
                                    ON SALE
                                </Typography>

                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 5, -5, 0],
                                        color: ['#FBBF24', '#EF4444', '#F97316', '#FBBF24']
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }}
                                >
                                    <HiFire className="text-4xl" />
                                </motion.div>
                            </div>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-2xl text-gray-300 font-light text-center"
                            >
                                PRAMSTORE FLASH DEALS
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-lg text-gray-300 font-light text-center"
                            >
                                Limited time offers on premium streetwear. Dont miss out on these exclusive deals!
                            </motion.p>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
                                <motion.p className="text-red-200 font-light mb-2">
                                    Sale ends in:
                                </motion.p>
                                <motion.div className="flex justify-center gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                >
                                    {['12', '34', '56'].map((time, i) => (
                                        <div key={i} className="bg-white text-red-600 rounded-lg px-3 py-2 font-bold text-xl">
                                            {time}
                                        </div>
                                    ))}
                                </motion.div>
                                <div className="flex justify-center font-extralight gap-6 mt-2 text-red-200 text-sm">
                                    <span>HOURS</span>
                                    <span>MINS</span>
                                    <span>SECS</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

              
                <motion.section
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-7xl mx-auto px-6 py-8"
                >
                    <div className="bg-gray-500/10 backdrop-blur-xl border border-gray-400/20 rounded-3xl p-8 shadow-2xl shadow-gray-500/10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            {/* Filters */}
                            <div className="flex items-center gap-6">
                                <motion.div
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <HiFilter className="text-gray-400 text-2xl drop-shadow-lg" />
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="text-xl text-gray-100 font-light"
                                >
                                    Filter:
                                </motion.p>
                                <div className="grid  lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                                    {['all', 'clothing', 'accessories', 'footwear'].map((category) => (
                                        <motion.button
                                            key={category}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setFilter(category)}
                                            className={`px-6 py-3 flex items-center justify-center rounded-xl font-light text-sm transition-all duration-300 backdrop-blur-sm border ${
                                                filter === category
                                                    ? 'bg-gray-500/30 text-white border-gray-300/50 shadow-lg shadow-gray-500/25'
                                                    : 'bg-white/5 text-gray-200 border-gray-500/20 hover:bg-gray-500/20 hover:border-gray-400/40'
                                            }`}
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-4">
                                <motion.p className="text-gray-100 text-lg font-light">Sort by:</motion.p>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-gray-500/20 backdrop-blur-sm font-light text-gray-100 rounded-xl px-4 py-3 border border-gray-400/30 focus:border-gray-300/60 focus:outline-none focus:ring-2 focus:ring-gray-400/20 transition-all duration-300"
                                >
                                    <option value="discount" className="bg-slate-800 text-gray-100">Highest Discount</option>
                                    <option value="price" className="bg-slate-800 text-gray-100">Lowest Price</option>
                                    <option value="time" className="bg-slate-800 text-gray-100">Ending Soon</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Products Section - Cyan Glass Theme */}
                <motion.section className="max-w-7xl mx-auto px-6 pb-16">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full shadow-lg shadow-cyan-400/30"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {sortedProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -12, scale: 1.03 }}
                                    className="group relative bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-slate-800/20 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-cyan-400/20 hover:border-cyan-300/40 hover:shadow-cyan-500/20 transition-all duration-500"
                                >
                                    <Link href={`/catalog/${product.type}/${product.name}`}>
                                        {/* Discount Badge */}
                                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                            <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 text-xs font-light tracking-wider rounded-lg shadow-lg shadow-red-500/30">
                                                -{product.discount}%
                                            </div>
                                        </div>

                                        {/* Time Left Badge */}
                                        <div className="absolute top-4 right-4 z-10 bg-cyan-500/20 backdrop-blur-sm text-cyan-100 px-3 py-1 text-xs font-light tracking-wider rounded-lg flex items-center gap-1 border border-cyan-400/30">
                                            <HiClock className="text-sm text-yellow-400" />
                                            {product.timeLeft}h
                                        </div>

                                        {/* Wishlist Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleFavorite(product.discount);
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-16 right-4 z-10 bg-cyan-500/20 backdrop-blur-sm rounded-full p-3 text-cyan-300 hover:text-red-400 hover:bg-cyan-400/30 transition-all duration-300 opacity-0 group-hover:opacity-100 border border-cyan-400/20"
                                        >
                                            {favorites.includes(product.discount) ? (
                                                <HiHeart className="text-lg text-red-500" />
                                            ) : (
                                                <HiOutlineHeart className="text-lg" />
                                            )}
                                        </motion.button>

                                        {/* Product Image */}
                                        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/5 to-slate-800/10 rounded-t-2xl">
                                            <Image
                                                src={product.image || "/placeholder.png"}
                                                alt={product.name}
                                                width={400}
                                                height={400}
                                                className="w-full h-64 object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                            />

                                            {/* Glass Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                                                <motion.div
                                                    initial={{ y: 20, opacity: 0 }}
                                                    whileHover={{ y: 0, opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="text-cyan-100 text-sm font-light tracking-wide bg-cyan-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-400/30"
                                                >
                                                    View Details
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-6">
                                            <p className="text-xs text-cyan-400 font-light tracking-wider mb-2 capitalize">
                                                {product.category}
                                            </p>

                                            <h3 className="text-lg font-light text-cyan-100 mb-4 line-clamp-2 hover:text-white transition-colors duration-300">
                                                {product.name}
                                            </h3>

                                            {/* Price Section */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="flex items-center text-white font-light text-xl">
                                                    <HiCurrencyDollar className="mr-1 text-cyan-400" />
                                                    {product.price}
                                                </div>
                                                <div className="flex items-center text-cyan-300/60 font-light text-sm line-through">
                                                    <HiCurrencyDollar className="mr-1 text-cyan-400/40" />
                                                    {product.originalPrice}
                                                </div>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    // Add to cart logic here
                                                }}
                                                className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white py-3 text-xs font-light tracking-wide transition-all duration-300 cursor-pointer rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 shadow-lg shadow-cyan-500/25"
                                            >
                                                <HiShoppingCart className="text-lg" />
                                                ADD TO CART
                                            </motion.div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* No Products */}
                    {!loading && sortedProducts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-12 max-w-md mx-auto">
                                <motion.div
                                    animate={floatingAnimation}
                                    className="inline-block mb-6"
                                >
                                    <HiTag className="text-6xl text-cyan-400 mx-auto drop-shadow-lg" />
                                </motion.div>
                                <Typography size="2xl" type="Header" className="text-cyan-200 mb-4 font-light">
                                    No products found
                                </Typography>
                                <Typography size="base" type="Paragraph" className="text-cyan-300/70 font-light">
                                    Try adjusting your filters or check back later for new deals.
                                </Typography>
                            </div>
                        </motion.div>
                    )}
                    <div className="max-w-xl mx-auto px-6 text-center">
                        <div className=" rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
                            <motion.p className="font-bold text-3xl mb-4 text-cyan-100">
                                DONT MISS OUT!
                            </motion.p>

                            <motion.p className="text-cyan-200/80 font-light mb-8">
                                Subscribe to get notified about flash sales and exclusive deals
                            </motion.p>

                            <FormProvider {...methods}>
                                <motion.form
                                    onSubmit={handleSubmit(submit)}
                                    className="rounded-2xl font-light flex flex-col mx-auto items-center justify-center gap-4 p-6"
                                >
                                    <motion.div className="w-full">
                                        <Input
                                            id="name"
                                            type="text"
                                            label="Enter your name"
                                            placeholder=""
                                            autoComplete="off"
                                            {...register("name")}
                                        />
                                    </motion.div>

                                    <motion.div className="w-full">
                                        <Input
                                            id="email"
                                            type="email"
                                            label="Enter your email"
                                            placeholder=""
                                            autoComplete="off"
                                            {...register("email")}
                                        />
                                    </motion.div>
                                    
                                    <motion.div className="w-full">
                                        <select
                                            {...register("role")}
                                            defaultValue="ecommerce_expert"
                                            className="w-full bg-cyan-500/20 backdrop-blur-sm text-cyan-100 border border-cyan-400/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-300/60 transition-all duration-300"
                                        >
                                            <option value="ecommerce_expert" className="bg-slate-800 text-cyan-100">E-commerce Expert</option>
                                            <option value="supplier" className="bg-slate-800 text-cyan-100">Supplier</option>
                                            <option value="influencer" className="bg-slate-800 text-cyan-100">Influencer</option>
                                            <option value="developer" className="bg-slate-800 text-cyan-100">Developer</option>
                                        </select>
                                    </motion.div>
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gradient-to-r from-cyan-900 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-cyan-500/25 w-full"
                                    >
                                        SUBSCRIBE
                                    </motion.button>
                                </motion.form>
                            </FormProvider>
                        </div>
                    </div>
              
                </motion.section>

            </div>
        </Layout>
    );
}