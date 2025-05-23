import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { AppDispatch } from '@/store/store';
import { fetchItemByTypeAndName } from '@/store/slice/itemsDetail';
import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiOutlineHeart, HiHeart, HiShoppingCart, HiShare, HiStar } from "react-icons/hi";
import { FaShippingFast, FaShieldAlt, FaUndo } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function ProductPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || token === "null" || token === "undefined") {
      window.location.href = "/login";
    }

    if (router.isReady) {
      const { category, name } = router.query;
      console.log(category, name);
      if (category && name) {
        dispatch(fetchItemByTypeAndName({ type: category as string, name: name as string }))
          .unwrap();
      }
    }
  }, [router.isReady, router.query, dispatch]);

  const productData = useSelector((state: RootState) => state.detail.items);
  const loading = useSelector((state: RootState) => state.detail.loading);

  if (!router.isReady || loading) {
    return (
      <Layout withNavbar withFooter withHeader>
        <div className="w-full min-h-screen bg-zinc-900 mt-32 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: 4, ease: "linear" }}
            className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full"
          />
        </div>
      </Layout>
    );
  }

  const { category, name } = router.query;
  const product = productData?.find(
    (item) => item.name === name && item.type === category
  );

  if (!product) {
    return (
      <Layout withNavbar withFooter withHeader>
        <div className="w-full min-h-screen bg-zinc-900 mt-32 flex flex-col items-center justify-center text-white">
          <Typography size="4xl" type="Header" className="text-red-600 mb-4">404</Typography>
          <Typography size="2xl" type="Header" className="mb-4">Product Not Found</Typography>
          <button 
            onClick={() => router.back()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }


  const productImages = [
    product.image || "/placeholder.png",
    product.image || "/placeholder.png",
    product.image || "/placeholder.png",
    product.image || "/placeholder.png"
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  const handleAddToCart = () => {
    console.log("Added to cart:", { product, quantity, selectedSize });
  };

  const handleBuyNow = () => {
    console.log("Buy now:", { product, quantity, selectedSize });
  };

  return (
    <Layout withNavbar withFooter withHeader>
      <div className="w-full min-h-screen bg-zinc-900 mt-36 text-white">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-4 bg-zinc-800"
        >
          <div className="max-w-7xl mx-auto">
            <Typography size="sm" type="Paragraph" className="text-zinc-400">
              Home / {category} / <span className="text-white font-semibold">{product.name}</span>
            </Typography>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border-4 border-red-600">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full">
                  <Typography size="sm" type="Paragraph" className="font-bold">SUPREME</Typography>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-red-600 ring-2 ring-red-600/30' : 'border-zinc-300 hover:border-red-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain p-2"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Brand Badge */}
              <div className="flex items-center gap-2">
                <div className="bg-red-600 text-white px-4 py-2 rounded-full">
                  <Typography size="sm" type="Paragraph" className="font-black tracking-wider">SUPREME</Typography>
                </div>
                <MdVerified className="text-blue-500 text-xl" />
              </div>

              {/* Product Name */}
              <Typography size="4xl" type="Header" className="text-white font-black tracking-tight leading-tight">
                {product.name}
              </Typography>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <Typography size="sm" type="Paragraph" className="text-zinc-400">
                  4.9 (2,847 reviews)
                </Typography>
              </div>

              {/* Price */}
              <div className="bg-zinc-800 p-6 rounded-2xl border border-red-600/20">
                <Typography size="4xl" type="Header" className="text-red-600 font-black">
                  ${product.price || "299"}
                </Typography>
                <Typography size="lg" type="Paragraph" className="text-zinc-400 line-through">
                  ${product.price ? product.price + 50 : "349"}
                </Typography>
                <div className="bg-red-600 text-white px-3 py-1 rounded-full inline-block mt-2">
                  <Typography size="sm" type="Paragraph" className="font-bold">LIMITED DROP</Typography>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <Typography size="lg" type="Header" className="text-white">Size</Typography>
                <div className="grid grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border-2 rounded-lg font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'border-zinc-600 text-zinc-300 hover:border-red-400 hover:text-white'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <Typography size="lg" type="Header" className="text-white">Qty:</Typography>
                <div className="flex items-center bg-zinc-800 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-white hover:bg-zinc-700 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-white hover:bg-zinc-700 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  disabled={!selectedSize}
                  className={`w-full py-4 rounded-xl font-black text-lg tracking-wider transition-all ${
                    selectedSize
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                  }`}
                >
                  BUY NOW - SUPREME DROP
                </motion.button>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    disabled={!selectedSize}
                    className={`py-3 px-6 border-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                      selectedSize
                        ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                        : 'border-zinc-600 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    <HiShoppingCart className="text-xl" />
                    ADD TO CART
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="py-3 px-6 border-2 border-zinc-600 text-zinc-300 hover:border-red-400 hover:text-red-400 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    {isFavorited ? <HiHeart className="text-xl text-red-500" /> : <HiOutlineHeart className="text-xl" />}
                    {isFavorited ? 'SAVED' : 'SAVE'}
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <HiShare className="text-xl" />
                  SHARE THIS DROP
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-700">
                <div className="text-center">
                  <FaShippingFast className="text-2xl text-red-600 mx-auto mb-2" />
                  <Typography size="sm" type="Paragraph" className="text-zinc-300">Free Shipping</Typography>
                </div>
                <div className="text-center">
                  <FaShieldAlt className="text-2xl text-red-600 mx-auto mb-2" />
                  <Typography size="sm" type="Paragraph" className="text-zinc-300">Authenticity</Typography>
                </div>
                <div className="text-center">
                  <FaUndo className="text-2xl text-red-600 mx-auto mb-2" />
                  <Typography size="sm" type="Paragraph" className="text-zinc-300">Easy Returns</Typography>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Description */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-zinc-800 rounded-2xl p-8"
          >
            <Typography size="2xl" type="Header" className="text-white mb-6 border-b border-red-600 pb-4">
              PRODUCT DESCRIPTION
            </Typography>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Typography size="lg" type="Paragraph" className="text-zinc-300 leading-relaxed">
                  {product.description || "Experience the legendary Supreme quality with this exclusive drop. Crafted with premium materials and featuring the iconic Supreme aesthetic that has defined streetwear culture for decades."}
                </Typography>
                <div className="mt-6 space-y-2">
                  <Typography size="base" type="Paragraph" className="text-zinc-400">
                    • 100% Authentic Supreme merchandise
                  </Typography>
                  <Typography size="base" type="Paragraph" className="text-zinc-400">
                    • Limited edition release
                  </Typography>
                  <Typography size="base" type="Paragraph" className="text-zinc-400">
                    • Premium quality materials
                  </Typography>
                  <Typography size="base" type="Paragraph" className="text-zinc-400">
                    • Iconic Supreme branding
                  </Typography>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-600/20 to-zinc-900 p-6 rounded-xl border border-red-600/30">
                <Typography size="lg" type="Header" className="text-red-600 mb-4">
                  SUPREME AUTHENTICITY GUARANTEE
                </Typography>
                <Typography size="base" type="Paragraph" className="text-zinc-300">
                  Every Supreme item comes with our authenticity guarantee. We verify each piece through our expert authentication process to ensure you receive only genuine Supreme merchandise.
                </Typography>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}