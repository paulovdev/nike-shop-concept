import { AnimatePresence, motion } from "framer-motion";
import { megaMenuAnimation, slideUpWExitAnimation } from "../animations";
import { slideUpNoOpacityAnimation } from "@/components/shop-shoe-detail/animations";
import { useFilterStore, useMenuStore } from "@/store/zustand";
import Image from "next/image";
import { clipAnimation } from "../menu/animations";

const MegaMenu = ({
  hoveredCategory,
  setHoveredCategory,
  setSelectedShoe,
  setSelectedMenu,
}) => {
  const { setSelectedFilter } = useFilterStore();
  const { selectedMenu } = useMenuStore();

  if (!hoveredCategory) return null;

  const sections = hoveredCategory.sections || {};

  const handleClickSubCategory = (category, subCategory) => {
    setSelectedFilter({
      gender: hoveredCategory.title,
      category,
      subCategory,
      order: "asc",
    });
    setSelectedShoe(null);
    setSelectedMenu("shop");
    setHoveredCategory(null);
  };

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
          className="p-5 size-full flex items-start justify-between gap-8"
          key={hoveredCategory.title}
        >
          <div className="w-fit flex flex-col items-start">
            <div className="w-fit h-fit flex items-center gap-8">
              {Object.entries(sections).map(
                ([sectionKey, subCategories], i) => {
                  if (!subCategories) return null;
                  return (
                    <div key={sectionKey} className="w-fit h-[20px]">
                      <div className="mb-4 w-[150px] h-[22px] overflow-hidden">
                        <motion.h3
                          className="text-t font-bold text-[18px] uppercase"
                          variants={slideUpWExitAnimation}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          custom={0}
                        >
                          {sectionKey}
                        </motion.h3>
                      </div>

                      <ul className="h-full">
                        {subCategories.map((subCategory, i) => (
                          <div className="w-fit h-fit overflow-hidden">
                            <motion.li
                              key={subCategory}
                              className="text-t/50 text-[14px] font-semibold hover:text-t capitalize transition-all duration-200"
                              variants={slideUpNoOpacityAnimation}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              custom={i}
                              onClick={() =>
                                handleClickSubCategory(sectionKey, subCategory)
                              }
                            >
                              {subCategory}
                            </motion.li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-2">
            {["/promos/promo-7-26.jpg", "/promos/promo-7-27.avif"].map(
              (src, i) => (
                <motion.figure
                  key={i}
                  variants={clipAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={0.2 + i * 0.1}
                  className="w-full"
                >
                  <Image
                    src={src}
                    width={1000}
                    height={1000}
                    alt={`Promo ${i + 1}`}
                    className="w-full h-[250px] object-contain"
                  />
                </motion.figure>
              )
            )}
          </div>
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MegaMenu;
