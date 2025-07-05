import { AnimatePresence, motion } from "framer-motion";
import { megaMenuAnimation, slideUpWExitAnimation } from "../animations";
import { slideUpNoOpacityAnimation } from "@/components/shop-shoe-detail/animations";
import { useFilterStore } from "@/store/zustand";
import Image from "next/image";
import { clipAnimation } from "../menu/animations";

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
          className="p-5 size-full flex items-start justify-start gap-8"
          key={hoveredCategory.title}
        >
          <div className="w-fit flex-[0.25] ">
            <div className="absolute flex items-start gap-8">
              <div className="w-fit h-[24px] overflow-hidden">
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
              <ul className="w-fit h-fit overflow-hidden">
                {hoveredCategory.categories.map((category, i) => (
                  <div
                    className="h-fit overflow-hidden"
                    onClick={() => {
                      setSelectedFilter((prev) => ({
                        ...prev,
                        category: category,
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
                      {category}
                    </motion.p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-[2] w-fit h-fit flex items-center justify-center gap-2">
            <motion.figure
              variants={clipAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.1}
            >
              <Image
                src="/promos/promo-7-25.webp"
                width={1000}
                height={1000}
                alt=""
                className="h-[250px] object-fill"
              />
            </motion.figure>
            <motion.figure
              variants={clipAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.2}
            >
              <Image
                src="/promos/promo-7-26.jpg"
                width={1000}
                height={1000}
                alt=""
                className="h-[250px] object-fill"
              />
            </motion.figure>

            <motion.figure
              variants={clipAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.3}
            >
              <Image
                src="/promos/promo-7-27.avif"
                width={1000}
                height={1000}
                alt=""
                className="h-[250px] object-fill"
              />
            </motion.figure>

            <motion.video
              variants={clipAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={0.4}
              src="/index/welcome.mp4"
              width={1000}
              height={1000}
              alt=""
              className="h-[250px] object-fill"
              autoPlay
              muted
            />
          </div>
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MegaMenu;
