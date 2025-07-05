import { menuAnimation, textSlideAnimation } from "./animations";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useFilterStore, useMenuStore, useShoeStore } from "@/store/zustand";
import TextSlide from "@/components/reusable/text-slide";
import { SiNike } from "react-icons/si";
import { megaMenuCategories } from "@/data/filterData";
import { useState } from "react";
import { MdKeyboardReturn } from "react-icons/md";

const Menu = ({ menuModal, setMenuModal }) => {
  const { setSelectedShoe } = useShoeStore();
  const { setSelectedMenu, selectedMenu } = useMenuStore();
  const { setSelectedFilter, selectedFilter } = useFilterStore();

  const indexMenu = selectedMenu === "index";
  const [activeCategory, setActiveCategory] = useState(() => {
    return (
      megaMenuCategories.find((category) =>
        category.categories.includes(selectedFilter.category)
      ) || null
    );
  });

  console.log(selectedFilter);

  return (
    <div
      className="fixed w-screen h-[100dvh] flex items-center justify-between inset-0 z-100"
      key={menuModal}
    >
      <motion.div
        className="relative size-full flex-[1.5] bg-s z-50 select-none flex flex-col max-h-screen overflow-hidden max-lg:flex-[3]"
        variants={menuAnimation}
        initial="menuClosed"
        animate={menuModal && "menuOpen"}
        exit="menuClosed"
      >
        <div className="px-5 py-3 flex items-center justify-end">
          <div
            className="flex items-center gap-2 group"
            onClick={() => setMenuModal(false)}
          >
            <TextSlide text="CLOSE" />
            <X
              size={18}
              className="text-t transition-all duration-500 group-hover:rotate-45"
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <div
            className="pt-10 p-10 flex flex-col gap-2 max-md:p-5 max-md:pt-10"
            key={activeCategory}
          >
            <div className="h-fit overflow-hidden">
              <motion.div
                className="w-full flex items-center justify-between gap-4"
                variants={textSlideAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
                onClick={() => {
                  setSelectedMenu("index");
                  setMenuModal(false);
                  scrollTo({ top: 0 });
                }}
              >
                <div className="">
                  <SiNike
                    className={indexMenu ? "text-t/100" : "text-t/50"}
                    size={72}
                  />
                </div>
              </motion.div>
            </div>

            {!activeCategory &&
              megaMenuCategories.map((title, i) => (
                <div className="h-fit overflow-hidden" key={i}>
                  <motion.h2
                    variants={textSlideAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={i}
                    onClick={() => {
                      setActiveCategory(title);
                      setSelectedFilter((prev) => ({
                        ...prev,
                        title: title.title,
                      }));
                    }}
                    className={`font-semibold uppercase overflow-hidden`}
                  >
                    <div className="">
                      <TextSlide
                        text={title.title}
                        spanClass={
                          !indexMenu && selectedFilter.title === title.title
                            ? "text-t/100 text-[52px]"
                            : "text-t/50 text-[52px]"
                        }
                        customHeight="!h-[62px]"
                      />
                    </div>
                  </motion.h2>
                </div>
              ))}

            {activeCategory && (
              <>
                <div className="mt-8 mb-8 h-fit overflow-hidden">
                  <motion.h2
                    variants={textSlideAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0}
                    onClick={() => setActiveCategory(null)}
                    className={`font-semibold uppercase overflow-hidden`}
                  >
                    <div className="flex items-center gap-2">
                      <MdKeyboardReturn
                        size={24}
                        className="text-t pointer-events-auto"
                      />

                      <TextSlide
                        text="BACK"
                        spanClass="text-t text-[16px]"
                        customHeight="!h-[24px]"
                      />
                    </div>
                  </motion.h2>
                </div>

                {activeCategory.categories.map((category, i) => (
                  <div className="h-fit overflow-hidden" key={i}>
                    <motion.h2
                      variants={textSlideAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={i}
                      onClick={() => {
                        setSelectedFilter((prev) => ({
                          ...prev,
                          category: category,
                        }));
                        setSelectedShoe(null);
                        setSelectedMenu("shop");
                        setMenuModal(false);
                        scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`font-semibold uppercase overflow-hidden`}
                    >
                      <div className="">
                        <TextSlide
                          text={category}
                          spanClass={
                            !indexMenu && selectedFilter.category === category
                              ? "text-t/100 text-[52px]"
                              : "text-t/50 text-[52px]"
                          }
                          customHeight="!h-[62px]"
                        />
                      </div>
                    </motion.h2>
                  </div>
                ))}
              </>
            )}
          </div>
        </AnimatePresence>

        <div className="w-full h-full flex items-end justify-end">
          <div className="px-5 py-3 flex items-center gap-2">
            {["FB", "X", "GRAM", "YT"].map((social, i) => (
              <TextSlide key={i} text={social} spanClass="px-2" />
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative size-full flex-[1] max-ds:hidden"></div>
      <div className="relative size-full flex-[1.5] max-md:hidden"></div>

      <motion.div
        className="fixed w-screen h-screen inset-0 backdrop-blur-md z-40"
        onClick={() => setMenuModal(false)}
        variants={menuAnimation}
        initial="overlayClosed"
        animate={menuModal && "overlayOpen"}
        exit="overlayClosed"
      />
    </div>
  );
};

export default Menu;
