import { motion } from "framer-motion";

const textSlideUpAnimation = {
  initial: {
    y: "0%",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: 0.025,
    },
  },
  hover: {
    y: "-100%",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: 0.025,
    },
  },
};
const Text = ({ text, spanClass }) => (
  <span
    className={`text-t text-[12px] font-bold uppercase ${spanClass}`}
  >
    {text}
  </span>
);

const TextSlide = ({ text, customClass, spanClass, customHeight }) => {
  return (
    <div
      className={`h-[18px] overflow-hidden cursor-default select-none ${customHeight}`}
    >
      <motion.div
        className={`relative size-full flex flex-col ${customClass}`}
        variants={textSlideUpAnimation}
        initial="initial"
        whileHover="hover"
      >
        <Text text={text} spanClass={spanClass} />
        <Text text={text} spanClass={spanClass} />
      </motion.div>
    </div>
  );
};

export default TextSlide;
