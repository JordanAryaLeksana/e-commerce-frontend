"use client";
import Layout from "@/components/layout/layout";
import { AppDispatch, RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { setToken } from "@/store/slice/authSlice";
import {
  clearCartAsync,
  fetchCartItems,
  removeItem,
  updateQuantity,
} from "@/store/slice/cartSlice";
import { toast } from "react-hot-toast";
import { HiOutlineTrash, HiOutlineShoppingCart, HiOutlineCreditCard } from "react-icons/hi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
export default function CartPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const cartProducts = useSelector((state: RootState) => state.cart);
  const cartProductsItems = cartProducts?.cartItems || [];
  const total = cartProducts.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  useEffect(() => {
    setHasMounted(true);
    const cookieToken = Cookies.get("access_token");
    const userId = Cookies.get("user_id");

    if (!token && cookieToken) {
      dispatch(setToken(cookieToken));
    }

    if (!(token || cookieToken)) {
      router.push("/login");
    }

  
    if (cookieToken && userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [token, dispatch, router]);


  if (!hasMounted) return null;

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ itemId, quantity }));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  const HandleClear = async () => {
    if (!cartProducts.cartId) return;
    try {
      await dispatch(clearCartAsync(cartProducts.cartId));
      dispatch(fetchCartItems(cartProducts.cartId));
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const handleCheckout = async () => {
    // try {
    //   await dispatch(({
    //     userId: Cookies.get("user_id") || "",
    //     items: cartProductsItems.map(item => ({
    //       itemId: item.itemId,
    //       name: item.name,
    //       quantity: item.quantity,
    //       price: item.price
    //     })),
    //     total: total,
    //     status: "PENDING"
    //   }))
    //   router.push("/checkout/success");
    // } catch (error) {
    //   console.error("Checkout failed:", error);
    //   toast.error("Checkout gagal, silakan coba lagi.");
    // }
  };

  const totalCartPrice = cartProductsItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Layout withHeader withFooter withNavbar>
      <section className="min-h-screen bg-gradient-to-br mt-36 from-gray-50 to-gray-100 pt-20 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <HiOutlineShoppingCart className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Keranjang Belanja</h1>
            <p className="text-gray-600">Kelola produk favorit Anda sebelum checkout</p>
          </motion.div>

          {cartProductsItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Produk ({cartProductsItems.length} item)
                    </h2>
                    <button
                      onClick={HandleClear}
                      className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                    >
                      Kosongkan Keranjang
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cartProductsItems.map((item, index) => (
                      <motion.div
                        key={item.itemId}
                        variants={itemVariants}
                        className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Product Image Placeholder */}
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                            <HiOutlineShoppingCart className="text-gray-500 text-xl" />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Harga: <span className="font-medium">${item.price.toFixed(2)}</span>
                            </p>
                            <p className="text-sm font-semibold text-blue-600">
                              Total: ${item.totalPrice.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors disabled:opacity-50"
                              onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <AiOutlineMinus className="text-sm" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-colors"
                              onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}
                            >
                              <AiOutlinePlus className="text-sm" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            className="w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                            onClick={() => handleRemoveItem(item.itemId)}
                          >
                            <HiOutlineTrash className="text-lg" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Ringkasan Pesanan</h3>

                  {/* Summary Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartProductsItems.length} item)</span>
                      <span>${totalCartPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Ongkos Kirim</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Biaya Layanan</span>
                      <span>$2.00</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-lg font-semibold text-gray-800">
                      <span>Total Pembayaran</span>
                      <span>${(totalCartPrice + 7).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <HiOutlineCreditCard className="text-xl" />
                        <span>Checkout Sekarang</span>
                      </>
                    )}
                  </motion.button>

                  {/* Additional Actions */}
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => router.push("/catalog")}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Lanjut Belanja
                    </button>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mt-2">
                        🔒 Pembayaran aman dengan enkripsi SSL
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Empty Cart State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOutlineShoppingCart className="text-gray-400 text-4xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">

                Oops your cart is empty!
              </h2>
              <p className="text-gray-600 mb-8">

                You havent added any products to your cart yet.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/catalog")}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Start shopping now!
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}