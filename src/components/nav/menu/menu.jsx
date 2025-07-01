import { menuAnimation, textSlideAnimation } from "./animations";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useMenuStore } from "@/store/zustand";
import TextSlide from "@/components/reusable/text-slide";

const Menu = ({ menuModal, setMenuModal }) => {
  const { selectedMenu, setSelectedMenu } = useMenuStore();

  const navItems = [
    { id: "shop", label: "shop" },
    { id: "index", label: "index" },
    { id: "contact", label: "contact" },
  ];

  return (
    <div
      className="fixed w-screen h-[100dvh] flex items-center justify-between inset-0 z-100"
      key={menuModal}
    >
      <motion.div
        className="relative size-full flex-[1.5] bg-s z-50 select-none flex flex-col p-5 max-h-screen overflow-hidden max-lg:flex-[3]"
        variants={menuAnimation}
        initial="menuClosed"
        animate={menuModal && "menuOpen"}
        exit="menuClosed"
      >
        <div className="flex items-center justify-end">
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

        <div className="pt-10 flex flex-col gap-2">
          {navItems.map((item, i) => (
            <div className="h-fit overflow-hidden">
              <motion.h2
                key={item.id}
                variants={textSlideAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={i}
                onClick={() => {
                  setSelectedMenu(item.id);
                  setMenuModal(false);
                }}
                className={`font-semibold uppercase overflow-hidden`}
              >
                <TextSlide
                  key={i}
                  text={item.label}
                  spanClass={
                    selectedMenu === item.id
                      ? "text-t/100 text-[52px]"
                      : "text-t/50 text-[52px]"
                  }
                  customHeight="!h-[62px]"
                />
              </motion.h2>
            </div>
          ))}
        </div>

        <div className="w-full h-full flex items-end justify-end">
          <div className="flex items-center gap-2">
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
