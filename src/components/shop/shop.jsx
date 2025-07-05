import { motion, AnimatePresence } from "framer-motion";
import { useShoeStore, useFilterStore } from "@/store/zustand";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const cleanPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace("$", "").trim());
    }
    return price;
  };

  let filtered = [...data];

  if (selectedFilter.gender) {
    filtered = filtered.filter(
      (item) =>
        item.gender?.toLowerCase() === selectedFilter.gender.toLowerCase()
    );
  }

  if (selectedFilter.category) {
    filtered = filtered.filter(
      (item) =>
        item.category?.toLowerCase() === selectedFilter.category.toLowerCase()
    );
  }

  if (
    selectedFilter.subCategory &&
    !selectedFilter.subCategory.toLowerCase().startsWith("all")
  ) {
    filtered = filtered.filter(
      (item) =>
        item.subCategory?.toLowerCase() ===
        selectedFilter.subCategory.toLowerCase()
    );
  }

  if (searchQuery.trim() !== "") {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedFilter.order === "asc") {
    filtered.sort((a, b) => cleanPrice(a.price) - cleanPrice(b.price));
  } else if (selectedFilter.order === "desc") {
    filtered.sort((a, b) => cleanPrice(b.price) - cleanPrice(a.price));
  }

  const filterTitleParts = [];
  if (selectedFilter.gender)
    filterTitleParts.push(capitalize(selectedFilter.gender));
  if (selectedFilter.category)
    filterTitleParts.push(capitalize(selectedFilter.category));
  if (selectedFilter.subCategory)
    filterTitleParts.push(capitalize(selectedFilter.subCategory));
  const filterTitle = filterTitleParts.join(" / ") || "All";

  function capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
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

        <div className="py-15 px-5 w-full h-[50px] bg-s flex items-center justify-between select-none ">
          <div className="h-fit overflow-hidden">
            <motion.h2
              className="text-[42px] text-t font-bold uppercase flex items-center gap-2 max-md:text-[28px]"
              variants={textSlideSingleAnimation}
              initial="initial"
              animate="animate"
              custom={0.05}
            >
              {filterTitle}{" "}
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
                  <div className="h-fit overflow-hidden relative">
                    <motion.div
                      variants={textSlidesSearchAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={0}
                      className="relative"
                    >
                      <input
                        type="text"
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                        placeholder="Search"
                        className="w-full h-[30px] pl-10 border border-bb bg-ff outline-none text-t text-[10px] uppercase"
                      />
                      <div
                        className="absolute top-[6px] left-[10px] cursor-pointer"
                        onClick={() => {
                          setOpenSearch(false);
                          setSearchQuery("");
                        }}
                      >
                        <LuSearch size={26} className="text-t" />
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </AnimatePresence>
            <div className="h-fit">
              <div
                onClick={() => setOpenFilter(!openFilter)}
                className="cursor-pointer"
              >
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

        <div className="px-5">
          <p className="text-[14px] text-t/75 font-semibold">
            Football boots, running shoes, leather sneakers, everyday sneakers
            and shoes, here you will find all the Adidas footwear collections.
            Choose yours
          </p>
        </div>

        <div className="my-5 w-full h-0.5 bg-bb"></div>

        <div
          className="size-full px-5 py-5 grid grid-cols-4 gap-4 max-lg:grid-cols-2"
          key={`${selectedFilter?.order}-${selectedFilter?.category}-${searchQuery}`}
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative size-full flex flex-col items-start justify-start select-none group cursor-pointer"
              onClick={() => {
                setSelectedShoe(item);
                scrollTo({ top: 0 });
              }}
            >
              {/* Image and product info */}
              <motion.figure className="relative mb-4 z-10">
                <Image
                  src={item.img}
                  width={500}
                  height={500}
                  alt={item.title}
                  className="h-[350px] object-cover pointer-events-none"
                />
              </motion.figure>

              <div className="h-full flex flex-col items-start justify-end">
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
                    className="text-[16px] text-t font-bold"
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
                    className="text-[14px] text-t/75 font-medium capitalize"
                    variants={slideUpWExitAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={0.05}
                  >
                    {item.subCategory}
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
