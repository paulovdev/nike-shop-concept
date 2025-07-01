"use client";

import CartModal from "@/components/nav/cart/cart";
import Menu from "@/components/nav/menu/menu";
import Nav from "@/components/nav/nav";
import PreLoader from "@/pre-loader/pre-loader";

import Shop from "@/components/shop/shop";
import ShoesPhotosDetail from "@/components/shop-photos-detail/shop-photos-detail";

import { useMenuStore, useShoeStore } from "@/store/zustand";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ShopShoeDetail from "@/components/shop-shoe-detail/shop-shoe-detail";
import Contact from "@/components/nav/menu/contact";
import Footer from "../../public/footer/footer";
import ShoesPhotosDetailMobile from "@/components/shop-photos-detail/shop-photos-detail-mobile";
import Index from "@/components/index";

const Home = () => {
  const [menuModal, setMenuModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);

  const { selectedMenu } = useMenuStore();
  const { selectedShoe, setSelectedShoe } = useShoeStore();
  const isDs = useIsDesktop();
  const indexMenu = selectedMenu === "index";
  return (
    <>
      <PreLoader />

      <main className="h-full">
        <div
          className="relative flex items-start justify-between 
          max-lg:flex max-lg:flex-col max-lg:items-center max-lg:justify-center"
        >
          <div
            className={`w-full flex-[1.25] h-screen border-r ${
              indexMenu ? "" : "border-bb"
            } overflow-x-scroll z-50`}
          >
            {isDs ? <ShoesPhotosDetailMobile /> : <ShoesPhotosDetail />}
          </div>

          <div className="w-full flex-[2]">
            <div className="sticky top-0 left-0 w-full h-[50px] bg-s border-b border-t !border-bb flex items-center justify-between z-40 ">
              <Nav setMenuModal={setMenuModal} setCartModal={setCartModal} />
            </div>

            <AnimatePresence mode="wait">
              {selectedShoe === null ? (
                <>
                  <div className="w-full h-[calc(100vh_-_100px)] max-lg:h-full overflow-y-scroll flex flex-col items-start justify-start">
                    {selectedMenu === "shop" && <Shop />}
                    {selectedMenu === "index" && <Index />}
                    {selectedMenu === "contact" && <Contact />}
                  </div>
                </>
              ) : (
                <div className="w-full h-[calc(100vh_-_100px)] max-lg:h-full flex flex-col items-start justify-between">
                  <ShopShoeDetail />
                </div>
              )}
            </AnimatePresence>
            <div className="relative bottom-0 left-0 w-full h-[50px] bg-s border-t !border-bb flex items-center justify-between z-40">
              <Footer setMenuModal={setMenuModal} setCartModal={setCartModal} />
            </div>
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
