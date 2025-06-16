import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
export default function Profile() {
    const router = useRouter();
    useEffect(() => {
        const token = Cookies.get("access_token");
        if (!token || token === "null" || token === "undefined") {
            router.push("/login")
        } else {
            
        }
        
        

    }, [router]);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            <p className="text-lg">This is the profile page.</p>
        </div>
    )
}