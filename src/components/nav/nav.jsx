import { BsBag } from "react-icons/bs";

import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardReturn } from "react-icons/md";
import { slideUpAnimation, slideUpWExitAnimation } from "./animations";
import TextSlide from "@/components/reusable/text-slide";
import {
  useCartStore,
  useFilterStore,
  useMenuStore,
  useShoeStore,
} from "@/store/zustand";
import { SiNike } from "react-icons/si";

const Nav = ({ setMenuModal, setCartModal }) => {
  const { cart } = useCartStore();
  const { setSelectedShoe, selectedShoe } = useShoeStore();
  const { setSelectedMenu } = useMenuStore();
  const { setSelectedFilter, selectedFilter } = useFilterStore();
  const indexMenu = setSelectedMenu === "index";
  const shoeDetails = selectedShoe === null;
  const categories = ["shoes", "clothing", "accessories", "sports", "limited"];

  const scrollingShopToTop = () => {
    const scrollContainer = document.querySelector(".shop-class");
    scrollContainer?.scrollTo({ top: 0 });
  };

  return (
    <>
      <nav className="h-[50px] flex items-center justify-between w-full px-5 bg-s shadow-[0_8px_30px_rgb(0,0,0,0.07)] z-50 select-none">
        <div className="w-full flex items-center justify-between">
          {/* NIKE LOGO & HAMBURGUER MENU */}
          <div className="relative w-full flex items-center justify-start pointer-events-none">
            {/* hambuguer menu & nike logo */}
            <AnimatePresence>
              {selectedShoe === null && (
                <>
                  <div
                    className="absolute h-fit overflow-hidden max-lg:block hidden  pointer-events-auto"
                    onClick={() => setMenuModal(true)}
                  >
                    <motion.div
                      variants={slideUpAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={0.1}
                      className=" flex flex-col gap-1.5  group "
                    >
                      <div className="w-[36px] h-[2px] bg-t" />
                      <div className="w-[36px] h-[2px] bg-t" />
                    </motion.div>
                  </div>
                  <div className="absolute w-full h-fit overflow-hidden max-lg:hidden block">
                    <motion.div
                      className="w-full flex items-center justify-between gap-4"
                      variants={slideUpAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={0.1}
                      onClick={() => {
                        setSelectedMenu("index");
                        scrollTo({ top: 0 });
                      }}
                    >
                      <div className="">
                        <SiNike
                          className="text-t  pointer-events-auto"
                          size={52}
                        />
                      </div>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedShoe !== null && (
                <button
                  className="w-full h-fit overflow-hidden flex items-center pointer-events-none"
                  onClick={() => {
                    setSelectedShoe(null);
                    scrollTo({ top: 0 });
                  }}
                >
                  <motion.div
                    variants={slideUpAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.1}
                    className="text-t text-[12px] uppercase flex items-center gap-2 pointer-events-auto"
                  >
                    <MdKeyboardReturn
                      size={20}
                      className="text-t pointer-events-auto"
                    />
                    <TextSlide text="BACK" />
                  </motion.div>
                </button>
              )}
            </AnimatePresence>
          </div>

          {/* NAV */}
          <AnimatePresence>
            {" "}
            {shoeDetails && (
              <div
                className={`relative w-full h-fit flex items-center justify-center gap-8 max-lg:hidden`}
              >
                <div className="absolute h-fit overflow-hidden">
                  <motion.div
                    className="flex items-center overflow-hidden gap-8"
                    variants={slideUpAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.1}
                  >
                    {categories.map((category, i) => (
                      <div
                        key={i}
                        onClick={() => {
                        
                          setSelectedFilter((prev) => ({
                            ...prev,
                            category,
                          }));
                          setSelectedShoe(null);
                          setSelectedMenu("shop");
                          scrollingShopToTop();
                        }}
                      >
                        <TextSlide
                          text={category}
                          spanClass={
                            !indexMenu && selectedFilter.category === category
                              ? "text-t/100 text-[14px]"
                              : "text-t/50 text-[14px]"
                          }
                          customHeight="h-[21px]"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* BAG */}
          <div className="relative w-full flex items-center justify-end pointer-events-none">
            <div
              onClick={() => setCartModal(true)}
              className="w-full flex items-center justify-end gap-2"
            >
              <div
                className={` absolute w-full flex items-center justify-end ${
                  cart.length > 9 ? "left-[-7.5px]" : "left-[-10px]"
                } top-[8px] `}
              >
                <div
                  className="h-fit overflow-hidden  pointer-events-auto"
                  key={cart}
                >
                  <motion.p
                    className="text-t text-[9px] font-semibold"
                    variants={slideUpWExitAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.1}
                  >
                    {cart.length > 9 ? "9+" : cart.length}
                  </motion.p>
                </div>
              </div>
              <BsBag size={24} className="text-t  pointer-events-auto" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
