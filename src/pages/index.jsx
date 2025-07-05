"use client";

import CartModal from "@/components/nav/cart/cart";
import Menu from "@/components/nav/menu/menu";
import Nav from "@/components/nav/nav";
import PreLoader from "@/pre-loader/pre-loader";

import Shop from "@/components/shop/shop";
import ShoesPhotosDetail from "@/components/shop-photos-detail/shop-photos-detail";

import { useMenuStore, useShoeStore } from "@/store/zustand";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import ShopShoeDetail from "@/components/shop-shoe-detail/shop-shoe-detail";
import Contact from "@/components/nav/menu/contact";
import Footer from "../../public/footer/footer";
import ShoesPhotosDetailMobile from "@/components/shop-photos-detail/shop-photos-detail-mobile";
import Index from "@/components/index";
import PromoNav from "@/components/nav/promo-nav/promo-nav";

const Home = () => {
  const [menuModal, setMenuModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  const { selectedMenu } = useMenuStore();
  const { selectedShoe } = useShoeStore();
  const isDs = useIsDesktop();
  const indexMenu = selectedMenu === "index";
  const shoeDetails = selectedShoe === null;
  return (
    <>
      <PreLoader />

      <main className="h-full">
        <div
          className="relative flex items-start justify-between
          max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center"
        >
          <AnimatePresence>
            {!indexMenu && (
              <motion.div
                layout
                initial={{ flex: 0, opacity: 0 }}
                animate={{
                  flex: shoeDetails ? 1 : 4,
                  opacity: 1,
                  transition: {
                    duration: 0.75,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                exit={{
                  flex: 0,
                  opacity: 0,
                  transition: {
                    duration: 0.75,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                className={`sticky top-0 w-full h-screen overflow-x-scroll z-50 max-lg:relative`}
              >
                {isDs ? <ShoesPhotosDetailMobile /> : <ShoesPhotosDetail />}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="size-full flex-[2.5]">
            <div className="sticky top-0 left-0 w-full h-fit bg-s flex flex-col items-center justify-between z-40 ">
              <PromoNav />
              <Nav setMenuModal={setMenuModal} setCartModal={setCartModal} />
            </div>
            <AnimatePresence mode="wait">
              {selectedShoe === null ? (
                <>
                  <div className="shop-class size-full max-lg:h-full flex flex-col items-start justify-start">
                    {selectedMenu === "shop" && <Shop />}
                    {selectedMenu === "index" && <Index />}
                    {selectedMenu === "contact" && <Contact />}
                  </div>
                </>
              ) : (
                <div className="w-full max-lg:h-full flex flex-col items-start justify-between">
                  <ShopShoeDetail />
                </div>
              )}
            </AnimatePresence>
            <Footer />
          </div>
        </div>
      </main>

      <AnimatePresence mode="wait">
        {menuModal && (
          <Menu setMenuModal={setMenuModal} menuModal={menuModal} />
        )}

        {cartModal && (
          <CartModal setCartModal={setCartModal} cartModal={cartModal} />
        )}
      </AnimatePresence>
    </>
  );
};

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const updateIsDesktop = (e) => setIsDesktop(e.matches);
    updateIsDesktop(mediaQuery);

    mediaQuery.addEventListener("change", updateIsDesktop);
    return () => mediaQuery.removeEventListener("change", updateIsDesktop);
  }, []);

  return isDesktop;
};

export default Home;
