export const opacityWScaleAnimation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.25, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: 0.5,
    },
  },
};
export const clipImageAnimation = {
  initial: { clipPath: "inset(100% 0% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: 0.05,
    },
  },
  exit: {
    clipPath: "inset(100% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
