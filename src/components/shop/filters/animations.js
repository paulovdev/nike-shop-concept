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
export const textSlideNoDelayAnimation = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.025 * i,
    },
  }),
  exit: (i) => ({
    y: "100%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.025 * i,
    },
  }),
};
