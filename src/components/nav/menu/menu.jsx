import { menuAnimation, textSlideAnimation } from "./animations";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useFilterStore, useMenuStore, useShoeStore } from "@/store/zustand";
import TextSlide from "@/components/reusable/text-slide";
import { SiNike } from "react-icons/si";

const Menu = ({ menuModal, setMenuModal }) => {
  const { setSelectedShoe } = useShoeStore();
  const { setSelectedMenu, selectedMenu } = useMenuStore();
  const { setSelectedFilter, selectedFilter } = useFilterStore();

  const categories = ["shoes", "clothing", "accessories", "sports", "limited"];
  const indexMenu = selectedMenu === "index";
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

        <div className="pt-10 p-10 flex flex-col gap-2 max-md:p-5 max-md:pt-10">
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
          {categories.map((category, i) => (
            <div className="h-fit overflow-hidden">
              <motion.h2
                key={category.id}
                variants={textSlideAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={i}
                onClick={() => {
                  setSelectedFilter((prev) => ({
                    ...prev,
                    category,
                  }));
                  setSelectedShoe(null);
                  setSelectedMenu("shop");
                  setMenuModal(false);
                  scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`font-semibold uppercase overflow-hidden`}
              >
                <div className="" key={i}>
                  <TextSlide
                    key={i}
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
        </div>

        <div className="p-10 pt-20 flex flex-col max-md:p-5 max-md:pt-20">
          <p className="mb-4 text-[18px] text-t/75 font-medium max-md:text-[16px]">
            Become a Nike Member for the best products, inspiration and stories
            in sport. <span className="text-t/100">Learn more</span>
          </p>
          <div className="flex items-center gap-4">
            <button
              className="w-fit h-[35px] px-6 rounded-full bg-t text-p text-[14px] font-semibold text-center"
              onClick={() => setSelectedMenu("shop")}
            >
              Shop
            </button>
            <button
              className="w-fit h-[35px] px-6 rounded-full border border-bb text-t text-[14px] font-semibold text-center"
              onClick={() => setSelectedMenu("shop")}
            >
              Shop
            </button>
          </div>
        </div>

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
