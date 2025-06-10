"use client";
import Layout from "@/components/layout/layout";
import { AppDispatch, RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { setToken } from "@/store/slice/authSlice";
import { clearCartAsync, fetchCartItems } from "@/store/slice/cartSlice";
import { HiOutlineTrash } from "react-icons/hi";
import { fetchDecrement, fetchIncrement } from "@/store/slice/quantitySlice";
import { getItemsByCategory } from "@/store/slice/itemsSlice";
export default function CartPage() {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const detailState = useSelector((state: RootState) => state.detail);

    const ProductItems = detailState.items;
    const token = useSelector((state: RootState) => state.auth.token);
    const userId = Cookies.get("user_id");

    useEffect(() => {
        const cookieToken = Cookies.get("access_token");
        if (!token && cookieToken) {
            dispatch(setToken(cookieToken));
        }
        if (token || (cookieToken && cookieToken !== "undefined")) {
            console.log("Token is set:", token || cookieToken);
        } else {
            router.push("/login");
        }
    }, [token, dispatch, router]);

    const cart = useSelector((state: RootState) => state.cart);
    const cartItems = cart?.cartItems || [];


    const HandleClear = async () => {
        if (!userId || userId.trim() === '') {
            console.error('Invalid user ID');
            return;
        }
        try {
            await dispatch(clearCartAsync(userId));
            dispatch(fetchCartItems(userId));
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const handleIncrement = async (itemId: string, cartId?: string) => {
        if (!cartId) return;
        try {
            await dispatch(fetchIncrement({ productId: itemId, cartId }))
            
            dispatch(fetchCartItems(userId!));
            console.log("Increment successful");
        } catch (error) {
            console.error("Increment failed:", error);
        }
    };

    const handleDecrement = async (itemId: string, cartId?: string) => {
        if (!cartId) return;
        try {
            await dispatch(fetchDecrement({ productId: itemId, cartId }));
            dispatch(fetchCartItems(userId!));
            console.log("Decrement successful");
        } catch (error) {
            console.error("Decrement failed:", error);
        }
    };

   

    return (
        <Layout withHeader withFooter withNavbar>
            <section className="h-full w-full min-h-screen mt-60 bg-white">
                <motion.section className="flex flex-col items-center justify-center w-full h-full">
                    <motion.div className="flex flex-col items-center relative w-full">
                        <h1 className="text-2xl font-bold mb-4">Cart Items</h1>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.itemId} className="flex flex-col w-full max-w-2xl mb-4 border rounded p-4">
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => handleDecrement(item.itemId, item.userId)}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            onClick={() => handleIncrement(item.itemId, item.userId)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2"
                                        onClick={HandleClear}
                                    >
                                        <HiOutlineTrash className="text-lg" />
                                        Remove
                                    </button>

                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Cart kosong</p>
                        )}

                    </motion.div>
                </motion.section>
            </section>
        </Layout>
    );
}