import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { MdKeyboardReturn } from "react-icons/md";
import { SiNike } from "react-icons/si";
import { clipAnimation, menuAnimation, textSlideAnimation } from "./animations";
import TextSlide from "@/components/reusable/text-slide";
import { useFilterStore, useMenuStore, useShoeStore } from "@/store/zustand";
import { megaMenuCategories } from "@/data/filterData";

const MenuRoot = ({ activeCategory, onSelectCategory }) => {
  return (
    <>
      {megaMenuCategories.map((category, i) => {
        const isActive = activeCategory?.title === category.title;
        return (
          <div className="h-fit overflow-hidden" key={category.title}>
            <motion.h2
              variants={textSlideAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={i}
              onClick={() => onSelectCategory(category)}
              className={`font-semibold uppercase overflow-hidden cursor-pointer ${
                isActive ? "text-t/100" : "text-t/50"
              }`}
            >
              <TextSlide
                text={category.title}
                spanClass={`text-[52px] ${
                  isActive ? "text-t/100" : "text-t/50"
                }`}
                customHeight="!h-[62px]"
              />
            </motion.h2>
          </div>
        );
      })}
    </>
  );
};

const MenuSections = ({ category, activeSection, onSelectSection }) => {
  return (
    <>
      {Object.keys(category.sections || {}).map((sectionKey, i) => {
        const isActive = activeSection === sectionKey;
        return (
          <div className="h-fit overflow-hidden" key={sectionKey}>
            <motion.h2
              variants={textSlideAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={i}
              onClick={() => onSelectSection(sectionKey)}
              className={`font-semibold uppercase overflow-hidden cursor-pointer ${
                isActive ? "text-t/100" : "text-t/50"
              }`}
            >
              <TextSlide
                text={sectionKey}
                spanClass={`text-[52px] ${
                  isActive ? "text-t/100" : "text-t/50"
                }`}
                customHeight="!h-[62px]"
              />
            </motion.h2>
          </div>
        );
      })}
    </>
  );
};

const MenuSubCategories = ({
  category,
  section,
  activeSubCategory,
  onSelectSubCategory,
}) => {
  const subCategories = category.sections?.[section] || [];
  return (
    <>
      {subCategories.map((subCategory, i) => {
        const isActive = activeSubCategory === subCategory;
        return (
          <div className="h-fit overflow-hidden" key={subCategory}>
            <motion.h2
              variants={textSlideAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={i}
              onClick={() => onSelectSubCategory(subCategory)}
              className={`font-semibold uppercase overflow-hidden cursor-pointer ${
                isActive ? "text-t/100" : "text-t/50"
              }`}
            >
              <TextSlide
                text={subCategory}
                spanClass={`text-[52px] ${
                  isActive ? "text-t/100" : "text-t/50"
                }`}
                customHeight="!h-[62px]"
              />
            </motion.h2>
          </div>
        );
      })}
    </>
  );
};

const Menu = ({ menuModal, setMenuModal }) => {
  const { setSelectedShoe } = useShoeStore();
  const { setSelectedMenu, selectedMenu } = useMenuStore();
  const { selectedFilter, setSelectedFilter } = useFilterStore();

  const indexMenu = selectedMenu === "index";

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  useEffect(() => {
    if (selectedFilter?.gender) {
      const cat = megaMenuCategories.find(
        (c) => c.title === selectedFilter.gender
      );
      setActiveCategory(cat || null);
      setActiveSection(selectedFilter.category || null);
      setActiveSubCategory(selectedFilter.subCategory || null);
    } else {
      setActiveCategory(null);
      setActiveSection(null);
      setActiveSubCategory(null);
    }
  }, [selectedFilter]);

  const goBack = () => {
    if (activeSection) {
      setActiveSection(null);
      setActiveSubCategory(null); // reset subcategoria ao voltar da seção
    } else if (activeCategory) {
      setActiveCategory(null);
      setActiveSection(null);
      setActiveSubCategory(null); // reset também aqui para garantir
    }
  };

  const handleSelectSubCategory = (subCategory) => {
    setActiveSubCategory(subCategory); // seta ativo aqui!
    setSelectedFilter({
      gender: activeCategory.title,
      category: activeSection,
      subCategory,
      order: "asc",
    });
    setSelectedShoe(null);
    setSelectedMenu("shop");
    setMenuModal(false);
    scrollTo({ top: 0, behavior: "smooth" });
    // NÃO zera activeCategory e activeSection aqui para manter estado correto
  };

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
            className="flex items-center gap-2 group cursor-pointer"
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
            className="pt-5 p-10 flex flex-col gap-2 max-md:p-5 max-md:pt-10"
            key={`${activeCategory?.title || "root"}-${
              activeSection || "none"
            }`}
          >
            <div className="mb-4 h-fit overflow-hidden">
              <motion.div
                className="w-full cursor-pointer"
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
                <SiNike className={indexMenu ? "text-t" : "text-t"} size={72} />
              </motion.div>
            </div>
            <div className="mb-4 h-fit overflow-hidden ">
              {activeCategory && (
                <motion.h2
                  variants={textSlideAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={0}
                  onClick={goBack}
                  className="w-full overflow-hidden flex items-center gap-2 cursor-pointer"
                >
                  <MdKeyboardReturn size={24} className="text-t" />
                  <TextSlide
                    text="BACK"
                    spanClass="text-t text-[16px]"
                    customHeight="!h-[24px]"
                  />
                </motion.h2>
              )}
            </div>

            {!activeCategory && (
              <MenuRoot
                activeCategory={activeCategory}
                onSelectCategory={(cat) => {
                  setActiveCategory(cat);
                  setSelectedFilter((prev) => ({
                    ...prev,
                    gender: cat.title,
                  }));
                }}
                activeSubCategory={activeSubCategory}
              />
            )}

            {activeCategory && !activeSection && (
              <MenuSections
                category={activeCategory}
                activeSection={activeSection}
                onSelectSection={(section) => setActiveSection(section)}
                activeSubCategory={activeSubCategory}
              />
            )}

            {activeCategory && activeSection && (
              <MenuSubCategories
                category={activeCategory}
                section={activeSection}
                activeSubCategory={activeSubCategory}
                onSelectSubCategory={handleSelectSubCategory}
              />
            )}

            <div className="mt-12">
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
                className="h-[275px] object-cover"
                autoPlay
                muted
              />
            </div>
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
        className="fixed w-screen h-screen inset-0 backdrop-blur-md z-40 cursor-pointer"
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
