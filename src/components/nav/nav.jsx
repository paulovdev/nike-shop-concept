import { BsBag } from "react-icons/bs";

import { motion } from "framer-motion";
import { MdKeyboardReturn } from "react-icons/md";
import { slideUpWExitAnimation } from "./animations";
import TextSlide from "@/components/reusable/text-slide";
import { useCartStore, useShoeStore } from "@/store/zustand";

const Nav = ({ setMenuModal, setCartModal }) => {
  const { cart } = useCartStore();
  const { setSelectedShoe, selectedShoe } = useShoeStore();
  return (
    <nav className="flex items-center justify-between w-full px-5 bg-s z-50 select-none">
      <div className="size-full flex justify-between">
        {selectedShoe === null && (
          <div
            className="flex items-center gap-2 cursor-default group"
            onClick={() => setMenuModal(true)}
          >
            <div className="flex flex-col gap-1.5">
              <div className="w-[40px] h-[2px] bg-t group-hover:-translate-y-[1px] transition-all duration-500" />

              <div className="w-[40px] h-[2px] bg-t group-hover:translate-y-[1px] transition-all duration-500" />
            </div>
          </div>
        )}
        {/*  {selectedShoe === null && <div className=""></div>} */}
        {selectedShoe !== null && (
          <button
            className="w-full h-fit overflow-hidden flex items-center pointer-events-none"
            onClick={() => {
              setSelectedShoe(null);
              scrollTo({ top: 0 });
            }}
          >
            <motion.span
              variants={slideUpWExitAnimation}
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
            </motion.span>
          </button>
        )}

        <div className="flex items-center justify-between gap-8 relative">
          <div
            onClick={() => setCartModal(true)}
            className="flex items-center gap-2"
          >
            <p className="absolute left-[7px] top-[8px] text-t text-[9px] font-semibold">
              {cart.length >= 9 ? "9+" : cart.length}
            </p>
            <BsBag size={24} className="text-t" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
