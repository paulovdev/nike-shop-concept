import { useShoeStore } from "@/store/zustand";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { clipImageAnimation, opacityWScaleAnimation } from "./animations";

const ShoesPhotosDetailMobile = () => {
  const { selectedShoe } = useShoeStore();

  return (
    <motion.div
      className="size-full flex items-center justify-center bg-t"
      initial={{ height: 0 }}
      animate={{
        height: selectedShoe ? "400px" : 0,
        transition: {
          duration: 0.75,
          type: "tween",
          ease: [0.76, 0, 0.24, 1],
          delay: 0.5,
        },
      }}
    >
      <div className="absolute z-10 mix-blend-exclusion pointer-events-none">
        <h1 className="text-p text-[64px] font-bold italic ">NIKE</h1>
      </div>

      <AnimatePresence mode="wait">
        {selectedShoe && (
          <>
            <div
              className="size-full flex overflow-y-scroll select-none 
              max-lg:overflow-y-auto
              overflow-x-auto snap-x snap-mandatory"
            >
              {selectedShoe.imgDetails.map((src, i) => (
                <motion.figure
                  key={i}
                  className="size-full flex-shrink-0 snap-start"
                  variants={clipImageAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Image
                    src={src}
                    width={1000}
                    height={1000}
                    alt=""
                    className="size-full object-cover pointer-events-none"
                  />
                </motion.figure>
              ))}
            </div>

            <motion.div
              className="absolute w-full p-5 flex items-start justify-start gap-2 mix-blend-exclusion pointer-events-none"
              variants={opacityWScaleAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className="text-p text-[12px] font-azeret uppercase">
                SLIDE
              </span>
              <ArrowRight size={16} className="text-p" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShoesPhotosDetailMobile;
