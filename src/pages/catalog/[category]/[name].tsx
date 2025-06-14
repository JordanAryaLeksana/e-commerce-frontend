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
import { FaShippingFast, FaShieldAlt, FaUndo, FaCrown } from "react-icons/fa";
import { MdVerified, MdLocalOffer } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Cookies from 'js-cookie';
import { addToCart } from '@/store/slice/cartSlice';

export default function ProductPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
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

  const detailState = useSelector((state: RootState) => state.detail);
  console.log('detailState:', detailState.items);
  const productData = detailState.items;
  const loading = useSelector((state: RootState) => state.detail.loading);

  if (!router.isReady || loading) {
    return (
      <Layout withNavbar withFooter withHeader>
        <div className="w-full min-h-screen bg-gray-50 mt-32 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: 4, ease: "linear" }}
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
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
        <div className="w-full min-h-screen bg-gray-50 mt-32 flex flex-col items-center justify-center text-gray-800">
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
  const handleAddToCart = () => {
    const userId = Cookies.get("user_id");

    if (!userId || userId === "undefined") {
      console.error("User ID is missing from cookies");
      alert("You must be logged in to add items to cart.");
      return;
    }

    dispatch(addToCart({
      itemId: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image || "/placeholder.png",
      quantity,
      totalPrice: (product.price || 2000000) * quantity,
      stock: product.stock,
      type: product.type,
      cartId: userId,
    }));
  };
  const handleBuyNow = () => {
    console.log("Buy now:", { product, quantity });
  };

  const originalPrice = product.price ? product.price + 200000 : 2000000;
  const discountPercent = Math.round(((originalPrice - (product.price || 1800000)) / originalPrice) * 100);

  return (
    <Layout withNavbar withFooter withHeader>
      <div className="w-full min-h-screen bg-gray-50 mt-36">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-4 bg-white border-b"
        >
          <div className="max-w-7xl mx-auto">
            <Typography size="sm" type="Paragraph" className="text-gray-500">
              Home / {category} / <span className="text-red-600 font-semibold">{product.name}</span>
            </Typography>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Product Images - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />

                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full">
                  <Typography size="sm" type="Paragraph" className="font-bold">-{discountPercent}%</Typography>
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
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all shadow-sm ${selectedImage === idx ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200 hover:border-red-300'
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain p-3"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Details - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Store Badge */}
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full shadow-lg">
                  <Typography size="sm" type="Paragraph" className="font-bold tracking-wider flex items-center gap-2">
                    <FaCrown className="text-yellow-300" />
                    PRAMSTORE OFFICIAL
                  </Typography>
                </div>
                <MdVerified className="text-blue-500 text-xl" />
              </div>

              {/* Product Name */}
              <Typography size="3xl" type="Header" className="text-gray-800 font-bold leading-tight">
                {product.name}
              </Typography>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                  <Typography size="sm" type="Paragraph" className="ml-2 text-gray-600">
                    4.9
                  </Typography>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <Typography size="sm" type="Paragraph" className="text-gray-500">
                  Terjual 2 rb+ | 5 (702 rating)
                </Typography>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-red-50 to-blue-50 p-6 rounded-xl border border-red-200">
                <div className="flex items-baseline gap-3 mb-2">
                  <Typography size="3xl" type="Header" className="text-red-600 font-bold">
                    Rp{(product.price || 1829000).toLocaleString('id-ID')}
                  </Typography>
                  <Typography size="lg" type="Paragraph" className="text-gray-400 line-through">
                    Rp{originalPrice.toLocaleString('id-ID')}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full">
                    <Typography size="xs" type="Paragraph" className="font-bold">{discountPercent}%</Typography>
                  </div>
                  <Typography size="sm" type="Paragraph" className="text-red-600 font-semibold">
                    Hemat Rp{(originalPrice - (product.price || 1829000)).toLocaleString('id-ID')}
                  </Typography>
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-center">
                  <Typography size="sm" type="Paragraph" className="text-gray-600">Kondisi:</Typography>
                  <Typography size="sm" type="Paragraph" className="font-semibold text-gray-800">Baru</Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography size="sm" type="Paragraph" className="text-gray-600">Min. Pemesanan:</Typography>
                  <Typography size="sm" type="Paragraph" className="font-semibold text-gray-800">1 Buah</Typography>
                </div>
                <div className="flex justify-between items-center">
                  <Typography size="sm" type="Paragraph" className="text-gray-600">Etalase:</Typography>
                  <Typography size="sm" type="Paragraph" className="font-semibold text-red-600">Tersedia di PramStore</Typography>
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <Typography size="base" type="Header" className="text-gray-800">Atur jumlah dan catatan</Typography>
                  <Typography size="sm" type="Paragraph" className="text-gray-500">Stok: {product.stock}</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-gray-800 font-semibold min-w-[60px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <Typography size="sm" type="Paragraph" className="text-gray-600">
                    Subtotal: <span className="font-bold text-gray-800">Rp{((product.price || 1829000) * quantity).toLocaleString('id-ID')}</span>
                  </Typography>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg"
                >
                  + Keranjang
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    console.log(product.id);
                    router.push("/catalog/checkout/" + product.id + "?quantity=" + quantity);
                  }}
                  className="w-full py-4 border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white rounded-xl font-bold text-lg transition-all"
                >
                  Beli Langsung
                </motion.button>

                {/* Secondary Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 border border-gray-300 rounded-lg hover:border-red-400 transition-colors flex flex-col items-center gap-1"
                  >
                    <BiSupport className="text-xl text-gray-600" />
                    <Typography size="xs" type="Paragraph" className="text-gray-600">Chat</Typography>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="p-3 border border-gray-300 rounded-lg hover:border-red-400 transition-colors flex flex-col items-center gap-1"
                  >
                    {isFavorited ? <HiHeart className="text-xl text-red-500" /> : <HiOutlineHeart className="text-xl text-gray-600" />}
                    <Typography size="xs" type="Paragraph" className="text-gray-600">Wishlist</Typography>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors flex flex-col items-center gap-1"
                  >
                    <HiShare className="text-xl text-gray-600" />
                    <Typography size="xs" type="Paragraph" className="text-gray-600">Share</Typography>
                  </motion.button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <FaShippingFast className="text-2xl text-red-600 mx-auto mb-2" />
                  <Typography size="xs" type="Paragraph" className="text-gray-600 font-medium">Gratis Ongkir</Typography>
                </div>
                <div className="text-center">
                  <FaShieldAlt className="text-2xl text-red-600 mx-auto mb-2" />
                  <Typography size="xs" type="Paragraph" className="text-gray-600 font-medium">Garansi Resmi</Typography>
                </div>
                <div className="text-center">
                  <FaUndo className="text-2xl text-red-600 mx-auto mb-2" />
                  <Typography size="xs" type="Paragraph" className="text-gray-600 font-medium">Mudah Return</Typography>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                  <button className="pb-4 px-1 border-b-2 border-red-500 text-red-600 font-semibold">
                    <Typography size="base" type="Paragraph">Detail</Typography>
                  </button>
                  <button className="pb-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                    <Typography size="base" type="Paragraph">Spesifikasi</Typography>
                  </button>
                  <button className="pb-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                    <Typography size="base" type="Paragraph">Info Penting</Typography>
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Typography size="lg" type="Paragraph" className="text-gray-700 leading-relaxed mb-6">
                    {product.description || "Produk berkualitas tinggi dari PramStore dengan jaminan keaslian dan layanan terbaik. Dapatkan pengalaman berbelanja yang memuaskan dengan produk pilihan terbaik."}
                  </Typography>
                  <div className="space-y-3">
                    <Typography size="base" type="Paragraph" className="text-gray-600 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      100% Produk Original & Bergaransi Resmi
                    </Typography>
                    <Typography size="base" type="Paragraph" className="text-gray-600 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Gratis Ongkir ke Seluruh Indonesia
                    </Typography>
                    <Typography size="base" type="Paragraph" className="text-gray-600 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Pelayanan Customer Service 24/7
                    </Typography>
                    <Typography size="base" type="Paragraph" className="text-gray-600 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Packaging Aman & Rapi
                    </Typography>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-blue-50 p-6 rounded-xl border border-red-200">
                  <Typography size="lg" type="Header" className="text-red-700 mb-4 flex items-center gap-2">
                    <FaCrown className="text-yellow-500" />
                    PRAMSTORE QUALITY GUARANTEE
                  </Typography>
                  <Typography size="base" type="Paragraph" className="text-gray-700 mb-4">
                    Setiap produk PramStore telah melewati quality control ketat dan dilengkapi dengan garansi resmi.
                    Kami berkomitmen memberikan produk terbaik dengan layanan pelanggan yang memuaskan.
                  </Typography>
                  <div className="bg-white p-4 rounded-lg border border-red-200">
                    <Typography size="sm" type="Paragraph" className="text-red-700 font-semibold">
                      🛡️ Garansi Uang Kembali 100% jika produk tidak sesuai deskripsi
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}