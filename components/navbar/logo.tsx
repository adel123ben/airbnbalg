"use client";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return ( 
        <img className="hidden md:block cursor-pointer h-28 w-28" onClick={() => router.push('/')} src="/logo.jpg" alt="" />
     );
}
 
export default Logo;