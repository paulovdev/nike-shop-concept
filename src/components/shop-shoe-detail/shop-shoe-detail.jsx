"use client";
import { useShoeStore, useCartStore } from "@/store/zustand";
import Image from "next/image";
import { motion } from "framer-motion";
import { slideUpNoOpacityAnimation, slideUpWExitAnimation } from "./animations";
import { TbRulerMeasure } from "react-icons/tb";

import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { FaCopy, FaInstagram, FaThreads, FaWhatsapp } from "react-icons/fa6";
import PromoNav from "../promo-nav/promo-nav";

const ShopShoeDetail = () => {
  const { selectedShoe } = useShoeStore();
  const { cart, addToCart, removeFromCart } = useCartStore();

  const [selectedSize, setSelectedSize] = useState(
    selectedShoe.category === "clothing" ? "XS" : "6"
  );

  if (!selectedShoe) return null;

  const shoeSizes = [
    "6",
    "6.5",
    "7",
    "7.5",
    "8",
    "8.5",
    "9",
    "9.5",
    "10",
    "10.5",
    "11",
    "11.5",
    "12",
    "12.5",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ];

  const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const sizes =
    selectedShoe.category === "clothing" ? clothingSizes : shoeSizes;

  const alreadyInCart =
    selectedShoe &&
    selectedSize &&
    cart.some(
      (item) => item.id === selectedShoe.id && item.size === selectedSize
    );

  return (
    <>
      <motion.div
        className="size-full flex flex-col max-lg:overflow-y-visible"
        key={`${selectedShoe}`}
      >
        <motion.div className="size-full p-5 py-10 border-b border-bb flex flex-col items-center justify-center">
          <div className="w-[300px] h-[250px] flex items-center justify-center select-none">
            <motion.figure
              className="relative w-full flex items-center justify-center aspect-[4/3] "
              layoutId={`shoe-image-${selectedShoe.id}`}
            >
              <Image
                src={selectedShoe.img}
                fill
                alt={selectedShoe.title}
                className="object-contain pointer-events-none"
              />
            </motion.figure>
          </div>
        </motion.div>

        <div className="relative px-5 flex flex-col items-start justify-between max-md:flex-col bg-s z-10">
          <div className="relative w-full pt-6 flex flex-col items-start justify-start">
            <div className="mb-1 h-fit overflow-hidden">
              <motion.p
                className="text-[8px] text-t/75 font-azeret font-bold uppercase tracking-[1px]"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                {selectedShoe.underTitle}
              </motion.p>
            </div>
            <div className="mb-1 h-fit overflow-hidden">
              <motion.h2
                className="text-[32px] text-t font-bold uppercase"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <span className="font-bold italic">NIKE® </span>
                {selectedShoe.title}
              </motion.h2>
            </div>
            <div className="h-fit overflow-hidden">
              <motion.p
                className="text-[14px] text-t/75 font-medium mb-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                {selectedShoe.description}
              </motion.p>
            </div>
            <div className="mb-12 h-[24px] overflow-hidden">
              <motion.p
                className="text-[18px] text-t font-bold uppercase mb-8"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                {selectedShoe.price}
              </motion.p>
            </div>

            <div className="w-full mb-4 h-fit overflow-hidden">
              <motion.p
                className="w-full text-[12px] text-t font-semibold uppercase flex justify-between items-center"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <div className="w-full flex items-center gap-2  ">
                  <span className="w-[5px] h-[5px] bg-t" />
                  Select size
                </div>
                <div className="w-full flex items-center justify-end gap-2">
                  <TbRulerMeasure size={16} className="text-t" />
                  Size Guide
                </div>
              </motion.p>
            </div>

            <div className="mb-8 w-full grid grid-cols-5 gap-2 max-ds:grid-cols-4 max-lg:grid-cols-6 max-md:grid-cols-5">
              {sizes.map((size, i) => {
                const isActive = selectedSize === size;
                return (
                  <div
                    key={i}
                    className="h-fit overflow-hidden select-none group"
                  >
                    <motion.div
                      className={`border border-bb w-full py-3 flex items-center justify-center transition-all duration-200 ${
                        isActive ? "bg-f" : "bg-s"
                      } group-hover:bg-f `}
                      onClick={() => {
                        if (alreadyInCart) return;
                        setSelectedSize(size);
                      }}
                      variants={slideUpNoOpacityAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={i}
                    >
                      <p
                        className={`text-[10px] font-bold uppercase ${
                          isActive ? "text-p" : "text-f"
                        } group-hover:text-p transition-all duration-200`}
                      >
                        {size}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            <div className="w-full flex items-center justify-between gap-2">
              <div className="w-full h-[50px] overflow-hidden flex items-center">
                <motion.div
                  variants={slideUpWExitAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={0.1}
                  className="w-full flex items-center gap-4 select-none"
                >
                  <div
                    onClick={() => {
                      if (!selectedSize || alreadyInCart) return;
                      addToCart({ ...selectedShoe, size: selectedSize });
                    }}
                    className={`w-full h-[40px] px-6 py-2 bg-f border flex items-center justify-center gap-2 group transition-all duration-200 ${
                      alreadyInCart || !selectedSize
                        ? "opacity-75 pointer-events-none"
                        : "hover:bg-p hover:border-bb"
                    }`}
                  >
                    <ShoppingCart
                      size={16}
                      className="text-p group-hover:text-f transition-all duration-200"
                    />
                    <p className="text-p text-[10px] font-bold uppercase group-hover:text-f transition-all duration-200">
                      {alreadyInCart
                        ? "on the cart"
                        : !selectedSize
                        ? "Select a size"
                        : "Add to cart"}
                    </p>
                  </div>
                </motion.div>
              </div>
              {alreadyInCart && (
                <div
                  className="w-[50px] h-[40px] bg-p border-bb border flex items-center justify-center gap-2 group transition-all duration-200 
                hover:bg-f hover:border-transparent"
                  onClick={() => removeFromCart(selectedShoe.id)}
                >
                  <X
                    size={26}
                    className="text-t group-hover:text-s transition-all duration-200"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 flex flex-col h-full pr-2 max-md:px-0">
            <div className="mb-2 h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t font-semibold uppercase flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <span className="w-[5px] h-[5px] bg-t" /> PRODUCT DETAILS
              </motion.p>
            </div>
            <div className="mb-1 h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t/75 font-semibold uppercase  flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                COLOR: <span className="text-t font-bold"> BLACK</span>
              </motion.p>
            </div>
            <div className="mb-1 h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t/75 font-semibold uppercase  flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                SIZE:
                <span className="text-t font-bold">
                  {selectedSize || "None"}
                </span>
              </motion.p>
            </div>
            <div className="mb-1 h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t/75 font-semibold uppercase  flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                STYLE: <span className="text-t font-bold">FJ2568-002</span>
              </motion.p>
            </div>
            <div className="mb-[75px] h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t/75 font-semibold uppercase flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                Recommended for:
                <span className="text-t font-bold"> Everyday</span>
              </motion.p>
            </div>

            <div className="mb-2 h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t font-semibold uppercase flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <span className="w-[5px] h-[5px] bg-t" />
                more description
              </motion.p>
            </div>
            <div className="mb-[75px] h-fit overflow-hidden">
              <motion.p
                className="text-[14px] text-t/75 font-medium"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                Obsessed with speed? So are the game's biggest stars. That's why
                we made these Elite cleats with an improved 3/4-length Air Zoom
                unit. It gives you and the sport's fastest players the
                propulsive feel needed to break through the back line. The
                result is the most responsive Mercurial we've ever made, because
                you demand greatness from yourself and your footwear.
              </motion.p>
            </div>
            <div className="mb-2 h-fit overflow-hidden flex items-center">
              <motion.p
                className="text-[12px] text-t font-semibold uppercase  flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <span className="w-[5px] h-[5px] bg-t" /> SHARE
              </motion.p>
            </div>

            <div className="mb-[75px] h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t uppercase flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <FaInstagram size={16} className="text-t" />
                <FaThreads size={16} className="text-t" />
                <FaWhatsapp size={16} className="text-t" />
                <FaCopy size={16} className="text-t" />
              </motion.p>
            </div>

            <div className="mb-2 h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t font-semibold uppercase flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <span className="w-[5px] h-[5px] bg-t" /> Shipping
              </motion.p>
            </div>
            <div className="mb-[75px] h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t/75 font-medium uppercase underline mb-1"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                You'll see our shipping options at checkout.
              </motion.p>
            </div>
            <div className="mb-2 h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t font-medium uppercase  flex items-center gap-2"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                <span className="w-[5px] h-[5px] bg-t" /> Free Pickup
              </motion.p>
            </div>
            <div className="h-fit overflow-hidden">
              <motion.p
                className="text-[12px] text-t/75 font-medium uppercase underline mb-1"
                variants={slideUpWExitAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={0.1}
              >
                Find a Store
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ShopShoeDetail;
