import { AnimatePresence, motion } from "framer-motion";
import { megaMenuAnimation, slideUpWExitAnimation } from "../animations";
import { slideUpNoOpacityAnimation } from "@/components/shop-shoe-detail/animations";
import { useFilterStore } from "@/store/zustand";

const MegaMenu = ({
  hoveredCategory,
  setHoveredCategory,
  setSelectedShoe,
  setSelectedMenu,
}) => {
  const { setSelectedFilter } = useFilterStore();

  return (
    <motion.div
      className="absolute top-[80px] left-0 w-screen bg-s border-t !border-bb z-50 overflow-hidden"
      variants={megaMenuAnimation}
      initial="menuClosed"
      animate="menuOpen"
      exit="menuClosed"
    >
      <AnimatePresence mode="popLayout">
        <div
          className="p-10 size-full flex items-start justify-start gap-8"
          key={hoveredCategory.title}
        >
          <div className="h-[24px] overflow-hidden">
            <motion.h3
              className="text-t font-bold text-[22px] uppercase"
              variants={slideUpWExitAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.1}
            >
              {hoveredCategory.title}
            </motion.h3>
          </div>
          <ul className="h-fit overflow-hidden">
            {hoveredCategory.items.map((item, i) => (
              <div
                className="h-fit overflow-hidden"
                onClick={() => {
                  setSelectedFilter((prev) => ({
                    ...prev,
                    item,
                  }));
                  setSelectedShoe(null);
                  setSelectedMenu("shop");
                  setHoveredCategory(null);
                }}
              >
                <motion.p
                  key={i}
                  className="text-t/75 text-[12px] font-semibold hover:text-t uppercase cursor-pointer"
                  variants={slideUpNoOpacityAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={i}
                >
                  {item}
                </motion.p>
              </div>
            ))}
          </ul>
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MegaMenu;
