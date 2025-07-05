import { BsBag } from "react-icons/bs";
import { SiNike } from "react-icons/si";
import { MdKeyboardReturn } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { slideUpAnimation, slideUpWExitAnimation } from "./animations";
import TextSlide from "@/components/reusable/text-slide";
import {
  useCartStore,
  useFilterStore,
  useMenuStore,
  useShoeStore,
} from "@/store/zustand";
import { megaMenuCategories } from "@/data/filterData";
import MegaMenu from "./mega-menu/mega-menu";
import { useState } from "react";
const Nav = ({ setMenuModal, setCartModal }) => {
  const { cart } = useCartStore();
  const { setSelectedShoe, selectedShoe } = useShoeStore();
  const { setSelectedMenu, selectedMenu } = useMenuStore();
  const { setSelectedFilter, selectedFilter } = useFilterStore();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const indexMenu = selectedMenu === "index";
  const shoeDetails = selectedShoe === null;

  const scrollingShopToTop = () => {
    const scrollContainer = document.querySelector(".shop-class");
    scrollContainer?.scrollTo({ top: 0 });
  };

  console.log(hoveredCategory);

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
            {shoeDetails && (
              <div
                className={`w-fit h-full text-t z-50  max-lg:hidden`}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="h-[50px] flex items-center overflow-hidden">
                  <div className="h-fit overflow-hidden">
                    <motion.div
                      className=" flex items-center"
                      variants={slideUpAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={0.1}
                    >
                      {megaMenuCategories.map((category, i) => (
                        <div
                          key={i}
                          onMouseEnter={() => setHoveredCategory(category)}
                        /*   onClick={() => {
                            setSelectedFilter((prev) => ({
                              ...prev,
                              category: category.title,
                            }));
                            setSelectedShoe(null);
                            setSelectedMenu("shop");
                            scrollingShopToTop();
                          }} */
                          className={`${i === 0 && "pl-10"} ${
                            i === megaMenuCategories.length - 1 && "pr-10"
                          } px-5`}
                        >
                          <TextSlide
                            text={category.title}
                            spanClass="text-[14px]"
                            /*  spanClass={
                            !indexMenu &&
                            selectedFilter.category === category.title
                              ? "text-t/100 text-[14px]"
                              : "text-t/50 text-[14px]"
                          } */
                            customHeight="h-[21px]"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
                <AnimatePresence>
                  {hoveredCategory && (
                    <MegaMenu
                      hoveredCategory={hoveredCategory}
                      setHoveredCategory={setHoveredCategory}
                      setSelectedShoe={setSelectedShoe}
                      scrollingShopToTop={scrollingShopToTop}
                      setSelectedMenu={setSelectedMenu}
                    />
                  )}
                </AnimatePresence>
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
      {/*   <div
        className="w-fit h-full text-t bg-t  cursor-pointer z-50"
        onMouseEnter={() => setHoveredCategory("men")}
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="text-p">piroca</div>
        <AnimatePresence>
          {hoveredCategory && (
            <MegaMenu
              hoveredCategory={hoveredCategory}
              setHoveredCategory={setHoveredCategory}
              setSelectedShoe={setSelectedShoe}
            />
          )}
        </AnimatePresence>
      </div> */}
    </>
  );
};

export default Nav;
