import { BsBag } from "react-icons/bs";

import { AnimatePresence, motion } from "framer-motion";
import { MdKeyboardReturn } from "react-icons/md";
import { slideUpAnimation, slideUpWExitAnimation } from "./animations";
import TextSlide from "@/components/reusable/text-slide";
import { useCartStore, useShoeStore } from "@/store/zustand";

const Nav = ({ setMenuModal, setCartModal }) => {
  const { cart } = useCartStore();
  const { setSelectedShoe, selectedShoe } = useShoeStore();
  return (
    <nav className="flex items-center justify-between w-full px-5 bg-s z-50 select-none">
      <div className="size-full flex justify-between">
        <div className="relative w-fit h-[40px] flex items-center">
          <AnimatePresence>
            {selectedShoe === null && (
              <div
                className="absolute h-fit overflow-hidden "
                onClick={() => setMenuModal(true)}
              >
                <motion.div
                  variants={slideUpAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={0.1}
                  className=" flex flex-col gap-1.5  group"
                >
                  <div className="w-[36px] h-[2px] bg-t" />
                  <div className="w-[36px] h-[2px] bg-t" />
                </motion.div>
              </div>
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
        <div className="flex items-center justify-between gap-8 relative">
          <div
            onClick={() => setCartModal(true)}
            className="flex items-center gap-2"
          >
            <div
              className={`absolute ${
                cart.length > 9 ? "left-[7.5px]" : "left-[9px]"
              } top-[16px] `}
            >
              <div className="h-fit overflow-hidden" key={cart}>
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
            <BsBag size={24} className="text-t" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
