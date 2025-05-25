"use client"
import { useRouter } from "next/router";
import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { HiArrowCircleDown, HiStar, HiCurrencyDollar, HiOutlineHeart, HiFire, HiLightningBolt } from "react-icons/hi";
import Button from "@/components/buttons/Buttons";
import Threads from "@/components/animated/background";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const demoItems = [
    { link: '/', text: 'Supreme', image: '' },
    { link: '/', text: 'Off-White', image: '' },
    { link: '/', text: 'Bape', image: '' },
    { link: '/', text: 'Palace', image: '' },
    { link: '/', text: 'Kith', image: '' },
    { link: '/', text: 'Stone Island', image: '' },
    { link: '/', text: 'Fear of God', image: '' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Supreme Box Logo Hoodie",
      price: "450",
      image: "/placeholder.png",
      isNew: true,
      category: "Hoodies",
      limited: true
    },
    {
      id: 2,
      name: "Off-White Arrows Tee",
      price: "320",
      image: "/placeholder.png",
      isNew: false,
      category: "T-Shirts",
      limited: false
    },
    {
      id: 3,
      name: "Bape Shark Full Zip",
      price: "680",
      image: "/placeholder.png",
      isNew: true,
      category: "Jackets",
      limited: true
    },
    {
      id: 4,
      name: "Palace Tri-Ferg Crewneck",
      price: "180",
      image: "/placeholder.png",
      isNew: false,
      category: "Sweatshirts",
      limited: false
    }
  ];

  const bestSellers = [
    {
      id: 5,
      name: "Supreme Bandana Tee",
      price: "250",
      image: "",
      sales: "1.2K",
      rating: 4.9
    },
    {
      id: 6,
      name: "Kith Madison Hoodie",
      price: "220",
      image: "",
      sales: "890",
      rating: 4.8
    },
    {
      id: 7,
      name: "Stone Island Compass Logo",
      price: "380",
      image: "",
      sales: "654",
      rating: 4.7
    }
  ];
  const targetRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!targetRef.current) return console.error("Target reference is not set.");
  };

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

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <Layout>

      <section className="h-full pt-20 w-full relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
        <div className="min-h-screen relative overflow-hidden">

          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          {/* Floating Background Animation */}
          <div style={{ width: '100%', height: '600px', position: 'absolute', zIndex: 0, opacity: 0.15 }}>
            <Threads
              amplitude={0.5}
              distance={0}
              enableMouseInteraction={true}
            />
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
                    PRAMSTORE
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
                Curated Streetwear Excellence
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-lg text-gray-400 mb-12 text-center max-w-2xl font-light"
              >
                Authentic pieces • Exclusive collections • Timeless style
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={() => router.push("/catalog")}
                    className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-medium text-lg px-10 py-4 rounded-sm transition-all duration-500 shadow-lg border border-red-600/30"
                    type="button"
                    color="Light"
                  >
                    Explore Collection
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    onClick={() => router.push("/drops")}
                    className="bg-transparent border border-gray-600 hover:border-red-600 hover:bg-red-900/20 text-gray-300 hover:text-white font-medium text-lg px-10 py-4 rounded-sm transition-all duration-500"
                    type="button"
                    color="Light"
                  >
                    Latest Arrivals
                  </Button>
                </motion.div>
              </motion.div>


              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-12 mt-16 text-gray-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl font-light text-white mb-2">50K+</div>
                  <div className="text-sm text-gray-400 tracking-wide">Items Sold</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl font-light text-white mb-2">100%</div>
                  <div className="text-sm text-gray-400 tracking-wide">Authentic</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl font-light text-white mb-2">24H</div>
                  <div className="text-sm text-gray-400 tracking-wide">Delivery</div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="absolute bottom-[1%] z-10 lg:bottom-[10%] left-[50%] -translate-x-1/2 flex flex-col justify-center items-center gap-3"
          >
            <p className="text-sm text-gray-400 font-light tracking-widest">
              DISCOVER MORE
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={handleScroll}
              className="cursor-pointer"

            >
              <HiArrowCircleDown className="text-gray-400 text-2xl" />
            </motion.div>

          </motion.div>
        </div>

        {/* Elegant Brand Marquee */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="relative bottom-0 w-full overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black py-8 border-t border-gray-800"
        >
          <div className="relative">
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

            <div className="flex w-max animate-marquee">
              {[...demoItems, ...demoItems, ...demoItems].map(({ link, text }, index) => (
                <div key={index} className="flex-shrink-0 px-12">
                  <Link href={link} className="block">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400 hover:text-white font-light text-lg tracking-wider transition-colors duration-500"
                    >
                      {text}
                    </motion.div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </section>

      {/* Featured Products Section - Elegant Dark Theme */}
      <motion.section
        className="min-h-screen w-full relative bg-gradient-to-b from-black via-gray-900 to-gray-800 py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4"
          ref={targetRef}
        >
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-red-400 font-light tracking-wide mb-4">
              Featured Collection
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6"
            />
            <p className="text-gray-400 font-light">
              Handpicked pieces for the discerning collector
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-red-900/50"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Subtle Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isNew && (
                      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white px-3 py-1 text-xs font-light tracking-wider rounded-sm">
                        New
                      </div>
                    )}
                    {product.limited && (
                      <div className="bg-gray-800/90 backdrop-blur-sm text-gray-300 px-3 py-1 text-xs font-light tracking-wider rounded-sm flex items-center gap-1">
                        <HiFire className="text-sm text-red-500" />
                        Limited
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

                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-800 rounded-t-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Elegant Overlay */}
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
                      {product.category}
                    </p>

                    <h3 className="text-lg font-light text-white mb-4 line-clamp-2 hover:text-gray-300 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white font-light text-xl">
                        <HiCurrencyDollar className="mr-1 text-gray-400" />
                        {product.price}
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
            ))}
          </motion.div>

          {/* Elegant View All Button */}
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
              onClick={() => router.push("/catalog")}
              className="bg-transparent border border-gray-600 hover:border-red-600 hover:bg-red-900/20 text-gray-300 hover:text-white px-12 py-4 font-light tracking-wide transition-all duration-500 rounded-sm"
            >
              View All Products
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Best Sellers Section - Sophisticated Design */}
      <motion.section
        className="min-h-screen w-full relative bg-gradient-to-br from-gray-800 via-gray-900 to-red-900 py-24"
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
              Best Sellers
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "150px" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-6"
            />
            <p className="text-gray-400 font-light">
              Community favorites and trending pieces
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative bg-gradient-to-b from-black to-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-red-900/50"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Elegant Rank Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-800 to-red-900 text-white w-10 h-10 flex items-center justify-center font-light text-sm rounded-full">
                    {index + 1}
                  </div>

                  {/* Sales Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-gray-300 px-3 py-1 text-xs font-light rounded-sm">
                    {product.sales} sold
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Elegant Overlay */}
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
                    <h3 className="text-lg font-light text-white mb-3 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Elegant Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <HiStar
                            key={i}
                            className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400 font-light">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white font-light text-xl">
                        <HiCurrencyDollar className="mr-1 text-gray-400" />
                        {product.price}
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
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section - Minimalist Elegance */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="bg-gradient-to-r from-black via-gray-900 to-black py-24 relative overflow-hidden"
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
              Stay Connected
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
            Be the first to know about new arrivals and exclusive releases
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-gray-900 border border-gray-700 focus:border-red-600 text-white font-light placeholder-gray-500 focus:outline-none transition-colors duration-300 rounded-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 font-light tracking-wide transition-all duration-300 rounded-sm"
            >
              Subscribe
            </motion.button>
          </motion.div>

          <p className="text-sm text-gray-500 mt-8 font-light">
            No spam, unsubscribe at any time
          </p>
        </div>
      </motion.section>
    </Layout>
  );
}