"use client";
import Layout from "@/components/layout/layout";
import { AppDispatch, RootState } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
import { clearCartAsync } from "@/store/slice/cartSlice";
import { setToken } from "@/store/slice/authSlice";
import {
  HiOutlineLocationMarker,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineChevronDown,
  HiOutlineChevronRight,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { clearCart } from "@/store/slice/cartSlice";
import toast from "react-hot-toast";
import { createOrderAsync } from "@/store/slice/orderSlice";
import { setItems } from "@/store/slice/itemsDetail";
import { fetchItems } from "@/store/slice/itemsSlice";



export default function CheckoutPage() {
  const cartState = useSelector((state: RootState) => state.cart);
  const cartId = cartState?.cartId;
  const [hasMounted, setHasMounted] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { id, quantity } = router.query
  const cartProducts = useSelector((state: RootState) => state.cart?.cartItems ?? []);
  const detailItems = useSelector((state: RootState) => state.detail.items);
  const getProduct = detailItems.find((item) => item.id === id);
  const singleItem =
    id && cartProducts.length > 0
      ? cartProducts.find((item) => String(item.itemId) === String(id))
      : detailItems.find((item) => String(item.id) === String(id));
  console.log(getProduct);
  console.log("Single Item:", singleItem);
  const token = useSelector((state: RootState) => state.auth.token);
  const cartProductsItems = cartProducts.filter((item) => item.cartId === cartId);
  const checkoutItems = id
    ? singleItem
      ? [
        {
          ...singleItem,
          itemId: "id" in singleItem ? singleItem.id : singleItem.itemId,
          quantity: Number(quantity || 1),
        },
      ]
      : []
    : cartProductsItems;


  console.log("Checkout Items:", checkoutItems);
  useEffect(() => {
    setHasMounted(true);
    const cookieToken = Cookies.get("access_token");
    if (!token && !cookieToken) {
      router.push("/login");
      console.error("Token not found, redirecting to login");
      return;
    }

    if (!token && cookieToken) {
      dispatch(setToken(cookieToken));
    }

  }, [token, dispatch, router]);


  if (!hasMounted) return null;


  const handleCheckout = async () => {
    if (!token) {
      toast.error("Kamu belum login");
      router.push("/login");
    }


    try {
      const userId = Cookies.get("user_id") || "";
      const orderItems = checkoutItems.map((item) => ({
        name: item.name,
        itemId: item.itemId,
        quantity: item.quantity,
        price: item.price,
      }));

      const total = orderItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );

      const orderResult = await dispatch(
        createOrderAsync({
          orderId: "",
          userId,
          items: orderItems,
          totalPrice: total,
          status: "PENDING",
          orderDate: new Date().toISOString(),
        })
      );
      if (!createOrderAsync.fulfilled.match(orderResult)) {
        throw new Error(orderResult.payload as string);
      }

      if (!id) dispatch(clearCart());


      dispatch(setItems([]));

      dispatch(fetchItems())
      console.log("Order created successfully:", orderResult.payload);
      toast.success("Checkout & order berhasil!");
      // router.push("/checkout/success");

    } catch (error: any) {
      console.error("Checkout failed:", error);
      toast.error("Checkout gagal, silakan coba lagi.");
    }
  };



  return (
    <Layout withHeader withFooter withNavbar>
      <div className="min-h-screen bg-gray-50 pt-20 mt-40 pb-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <HiOutlineLocationMarker className="text-red-600 text-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">ALAMAT PENGIRIMAN</h3>
                    </div>
                    <button

                      className="text-red-600 font-medium text-sm hover:text-red-700"
                    >
                      Ganti
                    </button>
                  </div>
                </div>


              </motion.div>

              {/* Products */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="divide-y divide-gray-100">
                  {checkoutItems.length > 0 ? (
                    checkoutItems.map((item) => (
                      <div key={item.itemId} className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                          <Image
                            width={64}
                            height={64}
                            src={item.image || "/placeholder.jpg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-800 font-semibold">Rp{item.price.toLocaleString()}</p>
                          <p className="text-gray-500 text-sm">
                            Total: Rp{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-gray-500">Tidak ada produk untuk checkout</p>
                  )}
                </div>



              </motion.div>

              {/* Shipping Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button

                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <HiOutlineTruck className="text-gray-600 text-xl" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800">Pilih Metode Pengiriman</h3>


                    </div>
                  </div>
                  <HiOutlineChevronDown className={`transform transition-transform`} />
                </button>

                <AnimatePresence>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-600">JNE Reguler</span>
                        <span className="text-gray-800 font-medium">Rp20.000</span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-600">JNE Express</span>
                        <span className="text-gray-800 font-medium">Rp30.000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">J&T Express</span>
                        <span className="text-gray-800 font-medium">Rp25.000</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 font-medium">Metode Pembayaran</span>
                    </div>
                    <button className="text-red-600 font-medium text-sm">Lihat Semua</button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">

                </div>
              </motion.div>

              {/* Promo Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <button

                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">📱</span>
                    </div>
                    <span className="font-medium text-gray-800">Verifikasi nomor HP biar bisa pakai promo!</span>
                  </div>
                  <HiOutlineChevronRight />
                </button>
              </motion.div>

              {/* Order Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <HiOutlineInformationCircle className="text-gray-600" />
                    <span className="font-medium text-gray-800">Kasih Catatan</span>
                    <span className="text-sm text-gray-500">0/200</span>
                  </div>

                </div>
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
                <div className="p-4 space-y-3">
                  <hr className="border-gray-200" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Tagihan</span>
                    <span>
                      Rp
                      {checkoutItems
                        .reduce((total, item) => total + item.price * item.quantity, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-red-500 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <HiOutlineShieldCheck className="text-white text-lg" />
                    <span>Bayar Sekarang</span>
                  </motion.button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Dengan melanjutkan pembayaran, kamu menyetujui{" "}
                    <span className="text-red-600 underline">S&K Asuransi Pengiriman & Proteksi</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}