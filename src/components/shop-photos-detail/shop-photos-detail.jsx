import { useShoeStore } from "@/store/zustand";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { clipImageAnimation, opacityWScaleAnimation } from "./animations";

const ShoesPhotosDetail = () => {
  const { selectedShoe } = useShoeStore();

  return (
    <div className="size-full flex items-center justify-center bg-t">
      <div className="absolute z-10 mix-blend-exclusion pointer-events-none">
        <h1 className="text-p text-[64px] font-bold italic ">NIKE</h1>
      </div>
      <AnimatePresence mode="wait">
        {selectedShoe && (
          <>
            <div className="size-full flex flex-col overflow-y-scroll select-none">
              {selectedShoe.imgDetails.map((src, i) => (
                <motion.figure
                  className="size-full"
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
                    className="size-full object-cover pointer-events-none "
                    key={i}
                  />
                </motion.figure>
              ))}
            </div>

            <motion.div
              className="fixed bottom-5 flex items-center gap-2 mix-blend-exclusion"
              variants={opacityWScaleAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className="text-p text-[12px] font-azeret uppercase">
                SCROLL
              </span>
              <ArrowDown size={16} className="text-p" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoesPhotosDetail;
