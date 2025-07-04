import { motion } from "framer-motion";
import { useShoeStore, useFilterStore } from "@/store/zustand";

import { AnimatePresence } from "framer-motion";
import { IoFilterSharp } from "react-icons/io5";
import data from "@/data/data";
import {
  clipAnimation,
  opacityAnimation,
  slideUpWExitAnimation,
  textSlideSingleAnimation,
  textSlidesSearchAnimation,
} from "./animations";
import Image from "next/image";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import Filters from "./filters/filters";

const Shop = () => {
  const { setSelectedShoe } = useShoeStore();
  const { selectedFilter } = useFilterStore();
  const [openFilter, setOpenFilter] = useState(false);
  const [hoveredShoeId, setHoveredShoeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const cleanPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace("$", "").trim());
    }
    return price;
  };

  let filtered = [...data];

  if (searchQuery !== "") {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedFilter?.category) {
    filtered = filtered.filter(
      (item) => item.category === selectedFilter.category
    );
  }

  if (selectedFilter?.order === "asc") {
    filtered.sort((a, b) => cleanPrice(a.price) - cleanPrice(b.price));
  } else if (selectedFilter?.order === "desc") {
    filtered.sort((a, b) => cleanPrice(b.price) - cleanPrice(a.price));
  }

  return (
    <>
      <motion.div
        className="size-full flex flex-col items-start justify-start"
        variants={opacityAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="w-full">
          <motion.figure
            className="w-full h-[300px]"
            variants={clipAnimation}
            initial="initial"
            animate="animate"
            custom={0.2}
          >
            <Image
              src={"/shop/bg-shop.avif"}
              width={2000}
              height={2000}
              alt=""
              className="size-full object-cover"
            />
          </motion.figure>
        </div>

        <div className="sticky top-[80px] p-5 mb-8 w-full h-[50px] border-t !border-bb   bg-s flex items-center justify-between z-50 select-none ">
          <div className="h-fit overflow-hidden">
            <motion.h2
              className="text-[28px] text-t font-bold uppercase flex items-center gap-2
              max-md:text-[16px]"
              variants={textSlideSingleAnimation}
              initial="initial"
              animate="animate"
              custom={0.05}
            >
              {selectedFilter?.category || "All"}
              <span className="relative text-[12px] top-1">
                ({filtered.length})
              </span>
            </motion.h2>
          </div>

          <div className="w-fit flex items-center justify-end gap-4">
            <AnimatePresence mode="wait">
              <div
                className="relative w-full h-[30px] flex items-center"
                key={openSearch}
              >
                {!openSearch && (
                  <div
                    className="relative h-fit overflow-hidden"
                    onClick={() => setOpenSearch(true)}
                  >
                    <motion.div
                      variants={textSlidesSearchAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={0}
                    >
                      <LuSearch size={26} className="text-t" />
                    </motion.div>
                  </div>
                )}
                {openSearch && (
                  <div className="h-fit overflow-hidden">
                    <motion.div
                      variants={textSlidesSearchAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={0}
                    >
                      <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                        placeholder="Search"
                        className="w-full h-[30px] pl-10 border border-bb bg-ff outline-none text-t text-[10px]  uppercase"
                      />
                      <div
                        className="absolute top-[6px] left-[10px]"
                        onClick={() => setOpenSearch(false)}
                      >
                        <LuSearch size={26} className="text-t" />
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </AnimatePresence>
            <div className="h-fit">
              <div onClick={() => setOpenFilter(!openFilter)}>
                <IoFilterSharp size={26} className="text-t" />
              </div>
              <AnimatePresence>
                {openFilter && (
                  <Filters
                    setOpenFilter={setOpenFilter}
                    setSelectedShoe={setSelectedShoe}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div
          className="size-full px-5 py-5 grid grid-cols-3 gap-4 max-lg:grid-cols-2"
          key={`${selectedFilter?.order}-${selectedFilter?.category}-${searchQuery}`}
          onMouseLeave={() => setHoveredShoeId(null)}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative w-full p-2 select-none group"
              onMouseEnter={() => setHoveredShoeId(item.id)}
              onClick={() => {
                setSelectedShoe(item);
                scrollTo({ top: 0 });
              }}
            >
              <AnimatePresence>
                {hoveredShoeId === item.id && (
                  <motion.div
                    layoutId="highlight-box"
                    className="absolute bg-p/30 border border-f inset-0 z-0"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      clipPath: "inset(0% 0% 0% 0%)",
                      transition: {
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.1,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }}
                    style={{ padding: "2rem" }}
                  />
                )}
              </AnimatePresence>
              <div className="">
                <motion.figure
                  className="relative w-full aspect-[4/3] mb-2 z-10 "
                  layoutId={`shoe-image-${item.id}`}
                >
                  <Image
                    src={item.img}
                    fill
                    alt={item.title}
                    className="object-contain pointer-events-none"
                  />
                </motion.figure>
              </div>
              <div className="h-fit flex flex-col items-start justify-end">
                <div className="mb-1 h-fit overflow-hidden relative z-10">
                  <motion.p
                    className="text-[8px] text-t/75 font-azeret font-bold uppercase tracking-[1px]"
                    variants={slideUpWExitAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.05}
                  >
                    {item.underTitle}
                  </motion.p>
                </div>
                <div className="mb-1 h-fit overflow-hidden relative z-10">
                  <motion.h2
                    className="text-[16px] text-t font-bold uppercase"
                    variants={slideUpWExitAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.05}
                  >
                    {item.title}
                  </motion.h2>
                </div>
                <div className="mb-4 h-fit overflow-hidden relative z-10">
                  <motion.h2
                    className="text-[14px] text-t/75 font-bold uppercase"
                    variants={slideUpWExitAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.05}
                  >
                    {item.subcategory}
                  </motion.h2>
                </div>
                <div className="mb-1 h-fit overflow-hidden relative z-10">
                  <motion.p
                    className="text-[14px] text-t font-bold uppercase"
                    variants={slideUpWExitAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.05}
                  >
                    {item.price}
                  </motion.p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Shop;
