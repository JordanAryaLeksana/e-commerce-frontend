import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextPressure from "@/components/animated/pressure.text";
import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { HiArrowCircleDown, HiChevronDown, HiOutlineSearch, HiOutlineShoppingCart, HiOutlineUser, HiStar, HiFire, HiCurrencyDollar, HiOutlineHeart } from "react-icons/hi";
import { BsLightningFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import Button from "@/components/buttons/Buttons";
import AnimatedContent from "@/components/animated/animated_content";
import Threads from "@/components/animated/background";
import Link from "next/link";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Image from "next/image";
import SplitText from "@/components/animated/splitText";

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  // Sembunyikan komponen sampai sudah pasti client-side
  if (!isClient) return null;

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
      category: "Hoodies"
    },
    {
      id: 2,
      name: "Off-White Arrows Tee",
      price: "320",
      image: "/placeholder.png",
      isNew: false,
      category: "T-Shirts"
    },
    {
      id: 3,
      name: "Bape Shark Full Zip",
      price: "680",
      image: "/placeholder.png",
      isNew: true,
      category: "Jackets"
    },
    {
      id: 4,
      name: "Palace Tri-Ferg Crewneck",
      price: "180",
      image: "/placeholder.png",
      isNew: false,
      category: "Sweatshirts"
    }
  ];

  const bestSellers = [
    {
      id: 5,
      name: "Supreme Bandana Tee",
      price: "250",
      image: "/placeholder.png",
      sales: "1.2K",
      rating: 4.9
    },
    {
      id: 6,
      name: "Kith Madison Hoodie",
      price: "220",
      image: "/placeholder.png",
      sales: "890",
      rating: 4.8
    },
    {
      id: 7,
      name: "Stone Island Compass Logo",
      price: "380",
      image: "/placeholder.png",
      sales: "654",
      rating: 4.7
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <section className="h-full pt-20 w-full relative min-h-screen bg-black">
        <div className="min-h-screen relative">
          <div style={{ width: '100%', height: '600px', position: 'absolute', zIndex: 0 }}>
            <Threads
              amplitude={1}
              distance={0}
              enableMouseInteraction={true}
            />
          </div>
          <section className="h-full w-full relative z-10">
            <div className="flex flex-col items-center justify-center h-full w-full mt-10">
              <Typography type="Header" size="6xl" className="text-white font-bold mb-4">
                <SplitText
                  text="WELCOME TO PRAMSTORE"
                  delay={150}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  threshold={0.2}
                  rootMargin="-50px"
                />
              </Typography>
              <Typography type="Paragraph" size="2xl" className="text-white mb-4">
                <SplitText
                  text="Your one-stop shop for all things tech!"
                  delay={150}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  threshold={0.2}
                  rootMargin="-50px"
                />
              </Typography>
              <Button
                onClick={() => router.push("/catalog")}
                className="bg-[#e60012] hover:bg-[#c40010] text-white font-semibold text-sm px-4 py-2 rounded-xl"
                type="button"
                color="Light"
              >
                Shop Now
              </Button>
            </div>
          </section>

          <div className="absolute bottom-[40%] left-[50%] -translate-x-1/2 flex justify-center items-center gap-2 mt-4">
            <Typography type="Paragraph" size="2xl" className="text-white">
              Explore our collection
            </Typography>
            <HiArrowCircleDown className="text-white text-2xl animate-bounce" />
          </div>
        </div>

        <motion.section className="relative bottom-0 w-full overflow-hidden bg-white py-5">
          <div className="flex w-max animate-marquee">
            {[...demoItems, ...demoItems].map(({ link, text }, index) => (
              <div key={index} className="flex-shrink-0 px-6">
                <Link href={link} className="block">
                  <div className="bg-[#e60012] px-8 py-2">
                    <span className="text-white font-bold text-2xl tracking-normal whitespace-nowrap">
                      {text.toUpperCase()}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </motion.section>
      </section>

      {/* Featured Products Section */}
      <motion.section
        className="min-h-screen w-full relative bg-black py-20"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <Typography type="Header" size="5xl" className="text-white font-black tracking-wider mb-4">
              FEATURED PRODUCTS
            </Typography>
            <Typography type="Paragraph" size="lg" className="text-white/80 mb-6">
              Check out our latest arrivals and exclusive drops
            </Typography>
            <div className="w-24 h-1 bg-red-600 mx-auto" />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-zinc-900 border-2 border-zinc-800 hover:border-red-600 transition-all duration-300 overflow-hidden"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Badge */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 text-xs font-black tracking-wider">
                      NEW
                    </div>
                  )}

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
                      src={product.image}
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
                      size="sm"
                      type="Paragraph"
                      className="text-red-600 font-bold tracking-wider mb-1"
                    >
                      {product.category.toUpperCase()}
                    </Typography>
                    
                    <Typography
                      size="lg"
                      type="Header"
                      className="font-black text-white tracking-wide mb-3 line-clamp-2"
                    >
                      {product.name.toUpperCase()}
                    </Typography>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <Typography
                        size="xl"
                        type="Header"
                        className="flex items-center text-red-600 font-black"
                      >
                        <HiCurrencyDollar className="mr-1" />
                        {product.price}
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
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/catalog")}
              className="bg-transparent border-2 border-white text-white px-8 py-3 font-black tracking-wider hover:bg-white hover:text-black transition-all"
            >
              VIEW ALL PRODUCTS
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Best Sellers Section */}
      <motion.section
        className="min-h-screen w-full relative bg-zinc-900 py-20"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <Typography type="Header" size="5xl" className="text-white font-black tracking-wider mb-4">
              BEST SELLERS
            </Typography>
            <Typography type="Paragraph" size="lg" className="text-white/80 mb-6">
              Dont miss out on these popular items!
            </Typography>
            <div className="w-24 h-1 bg-red-600 mx-auto" />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-black border-2 border-zinc-800 hover:border-red-600 transition-all duration-300 overflow-hidden"
              >
                <Link href={`/product/${product.id}`} className="block">
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">
                    {index + 1}
                  </div>

                  {/* Sales Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm text-white px-3 py-1 text-xs font-bold">
                    {product.sales} SOLD
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-white">
                    <Image
                      src={product.image}
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
                      className="font-black text-white tracking-wide mb-3 line-clamp-2"
                    >
                      {product.name.toUpperCase()}
                    </Typography>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <HiStar 
                            key={i} 
                            className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <Typography size="sm" type="Paragraph" className="text-zinc-400">
                        ({product.rating})
                      </Typography>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <Typography
                        size="xl"
                        type="Header"
                        className="flex items-center text-red-600 font-black"
                      >
                        <HiCurrencyDollar className="mr-1" />
                        {product.price}
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
            ))}
          </motion.div>
        </div>
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
            STAY IN THE LOOP
          </Typography>
          <Typography size="lg" type="Paragraph" className="text-white/90 mb-8">
            Get exclusive access to drops, sales, and streetwear culture
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
    </Layout>
  );
}