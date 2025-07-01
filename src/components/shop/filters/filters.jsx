import { useFilterStore } from "@/store/zustand";
import { motion } from "framer-motion";
import TextSlide from "@/components/reusable/text-slide";
import {
  opacityWScaleAnimation,
  textSlideNoDelayAnimation,
} from "./animations";

const Filters = ({ setOpenFilter, setSelectedShoe }) => {
  const { selectedFilter, setSelectedFilter } = useFilterStore();

  const categories = ["shoes", "clothing", "accessories", "sports", "limited"];

  const sortOptions = [
    { label: "Price: Low to High", value: "asc" },
    { label: "Price: High to Low", value: "desc" },
  ];

  return (
    <>
      <motion.div
        className="absolute top-[65px] right-[15px] w-[250px] h-fit py-4 px-4 bg-s border border-bb z-20"
        variants={opacityWScaleAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="flex flex-col items-start gap-4">
          <div>
            <h3 className="text-[16px] font-bold text-t/75 uppercase mb-1">
              Categories
            </h3>
            {categories.map((category, i) => (
              <div
                key={category}
                className="h-[20px] overflow-hidden  "
                onClick={() => {
                  setSelectedFilter((prev) => ({
                    ...prev,
                    category,
                  }));
                  setOpenFilter(false);
                  setSelectedShoe(null);
                }}
              >
                <motion.p
                  variants={textSlideNoDelayAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={i}
                >
                  <TextSlide
                    text={category}
                    spanClass={
                      selectedFilter?.category === category
                        ? "text-t"
                        : "text-t/50"
                    }
                  />
                </motion.p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-[14px] font-bold text-t/75 uppercase mb-1">
              Sort by
            </h3>
            {sortOptions.map(({ label, value }, i) => (
              <div
                key={value}
                className="h-[20px] overflow-hidden  "
                onClick={() => {
                  setSelectedFilter((prev) => ({
                    ...prev,
                    order: value,
                  }));
                  setOpenFilter(false);
                }}
              >
                <motion.p
                  variants={textSlideNoDelayAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={i}
                >
                  <TextSlide
                    text={label}
                    spanClass={
                      selectedFilter?.order === value ? "text-t" : "text-t/50"
                    }
                  />
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div
        className="fixed w-screen h-screen inset-0 z-10"
        onClick={() => setOpenFilter(false)}
      />
    </>
  );
};

export default Filters;
