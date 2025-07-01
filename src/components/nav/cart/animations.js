export const cartAnimation = {
  overlayOpen: {
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: 0.5,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  overlayClosed: {
    opacity: 0,
    transition: {
      duration: 0.75,
      delay: 0.5,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  cartOpen: {
    left: "0",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  cartClosed: {
    left: "100%",
    transition: {
      duration: 0.75,
      delay: 0.5,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const slideUpAnimation = {
  initial: { y: "100%" },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: 0.375 + 0.025 * custom,
    },
  }),
  exit: (custom) => ({
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: 0.025 * custom,
    },
  }),
};
