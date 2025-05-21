import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextPressure from "@/components/animated/pressure.text";
import Layout from "@/components/layout/layout";
import Typography from "@/components/Typography/Typography";
import { HiArrowCircleDown, HiChevronDown, HiOutlineSearch, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
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
    { link: '/', text: 'Supreme', image: '' },
    { link: '/', text: 'Supreme', image: '' },
    { link: '/', text: 'Supreme', image: '' },
    { link: '/', text: 'Supreme', image: '' },
    { link: '/', text: 'Supreme', image: '' },
    { link: '/', text: 'Supreme', image: '' }
  ];
  return (
    <Layout>
      <section className="h-full pt-20 w-full relative min-h-screen bg-black">
        <div className="min-h-screen relative ">
          <div style={{ width: '100%', height: '600px', position: 'absolute', zIndex: 0 }}>
            <Threads
              amplitude={1}
              distance={0}
              enableMouseInteraction={true}
            />
          </div>
          <section className="h-full w-full  relative z-10  ">
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
                  text=" Your one-stop shop for all things tech!"
          
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
      <motion.section
        className="h-screen w-full relative bg-black"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-row items-center justify-center h-full w-full">
          <div>

          <Typography type="Header" size="5xl" className="text-white font-bold mb-4">
            Featured Products
          </Typography>
          <Typography type="Paragraph" size="2xl" className="text-white mb-4">
            Check out our latest arrivals!
          </Typography>
          </div>
         
        </div>
      </motion.section>

      <motion.section
        className="h-screen w-full relative bg-black"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="flex flex-col items-center justify-center h-full w-full ">
          <Typography type="Header" size="5xl" className="text-white font-bold mb-4">
            Our Best Sellers
          </Typography>
          <Typography type="Paragraph" size="2xl" className="text-white mb-4">
            Don’t miss out on these popular items!
          </Typography>
        </div>
      </motion.section>
    </Layout>
  );
}
