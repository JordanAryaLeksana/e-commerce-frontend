import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchItems } from "@/store/slice/itemsSlice";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineHeart, HiHeart, HiShoppingCart, HiFire, HiClock, HiTag, HiFilter } from "react-icons/hi";
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
            // console.log("Form submitted with data:", data);
            toast.success("We've sent you an email! Thank you for joining our community.");
            methods.reset();
        } catch (error) {
            // console.error("Subscription error:", error);
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
            <div className="w-full min-h-screen bg-zinc-900 mt-10 text-white">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative bg-gradient-to-r  from-gray-900 via-gray-800 to-red-900 py-20"
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
                                <motion.div className="flex justify-center  gap-4"
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
                    <div className="bg-zinc-800 rounded-2xl p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Filters */}
                            <div className="flex items-center gap-4">
                                <HiFilter className="text-red-500 text-xl" />
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                    className="text-lg text-gray-300 mb-2 font-light text-center max-w-4xl"
                                >
                                    Filter:
                                </motion.p>
                                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-2">
                                    {['all', 'clothing', 'accessories', 'footwear'].map((category) => (
                                        <motion.button
                                            key={category}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setFilter(category)}
                                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${filter === category
                                                ? 'bg-red-600 text-white'
                                                : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                                                }`}
                                        >
                                            <motion.p
                                                className="font-light"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.8, duration: 0.8 }}
                                            >
                                                {category.charAt(0).toUpperCase() + category.slice(1)}
                                            </motion.p>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <motion.p className="text-white text-lg font-light ">Sort by:</motion.p>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-zinc-700 font-light text-white rounded-lg px-4 py-2 border border-zinc-600 focus:border-red-500 focus:outline-none"
                                >
                                    <option value="discount font-light">Highest Discount</option>
                                    <option value="price font-light">Lowest Price</option>
                                    <option value="time font-light">Ending Soon</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Products Grid */}
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {sortedProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-red-500/20 transition-all duration-300 relative group"
                                >
                                    {/* Discount Badge */}
                                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full z-10">
                                        <Typography size="sm" type="Paragraph" className="font-black">
                                            -{product.discount}%
                                        </Typography>
                                    </div>

                                    {/* Time Left Badge */}
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full z-10 flex items-center gap-1">
                                        <HiClock className="text-sm" />
                                        <Typography size="xs" type="Paragraph" className="font-bold">
                                            {product.timeLeft}h
                                        </Typography>
                                    </div>

                                    {/* Favorite Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleFavorite(product.discount)}
                                        className="absolute top-16 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        {favorites.includes(product.discount) ? (
                                            <HiHeart className="text-red-500 text-lg" />
                                        ) : (
                                            <HiOutlineHeart className="text-gray-600 text-lg" />
                                        )}
                                    </motion.button>

                                    <Link href={`/catalog/${product.type}/${product.name}`}>
                                        <div className="p-4">
                                            {/* Product Image */}
                                            <div className="relative aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                                                <Image
                                                    src={product.image || "/placeholder.png"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="space-y-2">
                                                <Typography size="lg" type="Header" className="text-black font-bold line-clamp-2">
                                                    {product.name}
                                                </Typography>

                                                <div className="flex items-center gap-2">
                                                    <Typography size="xl" type="Header" className="text-red-600 font-black">
                                                        ${product.price}
                                                    </Typography>
                                                    <Typography size="base" type="Paragraph" className="text-gray-500 line-through">
                                                        ${product.originalPrice}
                                                    </Typography>
                                                </div>

                                                <Typography size="sm" type="Paragraph" className="text-gray-600 capitalize">
                                                    {product.category}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Add to Cart Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-black text-white py-3 font-bold text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
                                    >
                                        <HiShoppingCart className="text-lg" />
                                        ADD TO CART
                                    </motion.button>
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
                            <HiTag className="text-6xl text-zinc-600 mx-auto mb-4" />
                            <Typography size="2xl" type="Header" className="text-zinc-400 mb-2">
                                No products found
                            </Typography>
                            <Typography size="base" type="Paragraph" className="text-zinc-500">
                                Try adjusting your filters or check back later for new deals.
                            </Typography>
                        </motion.div>
                    )}
                </section>
                {/* Newsletter Section */}

                <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                   
                    className="bg-gradient-to-t from-red-700 w-full"
                >
                    <div className="max-w-xl mx-auto px-6 text-center">
                        <motion.p
                          
                            className="font-bold text-3xl mb-4 text-white"
                        >
                            DONT MISS OUT!
                        </motion.p>

                        <motion.p
                            
                            className="text-red-100 font-light mb-8"
                        >
                            Subscribe to get notified about flash sales and exclusive deals
                        </motion.p>

                        <FormProvider {...methods}>
                            <motion.form
                                onSubmit={handleSubmit(submit)}
                                className="rounded-md bg-white font-light flex flex-col mx-auto items-center justify-center gap-3 p-3"
                            >
                                <motion.div >
                                    <Input
                                        id="name"
                                        type="text"
                                        label="Enter your name"
                                        placeholder=""
                                        autoComplete="off"
                                        {...register("name")}
                                    />
                                </motion.div>

                                <motion.div >
                                    <Input
                                        id="email"
                                        type="email"       
                                        label="Enter your email"
                                        placeholder=""
                                        autoComplete="off"
                                        {...register("email")}
                                    />
                                </motion.div>
                                <motion.div>
                                    <select
                                        {...register("role")}
                                        defaultValue="ecommerce_expert"
                                        ref={methods.register("role").ref}

                                        className="w-full bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        <option value="ecommerce_expert">E-commerce Expert</option>
                                        <option value="supplier">Supplier</option>
                                        <option value="influencer">Influencer</option>
                                        <option value="developer">Developer</option>
                                    </select>
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-800 text-white px-8 py-3 rounded-lg font-black hover:bg-red-100 transition-colors"
                                >
                                    SUBSCRIBE
                                </motion.button>
                            </motion.form>
                        </FormProvider>
                    </div>
                </motion.section>
            </div>
        </Layout >
    );
}