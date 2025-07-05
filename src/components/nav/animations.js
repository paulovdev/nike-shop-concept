export const slideUpWExitAnimation = {
  initial: { y: "150%" },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
  exit: (custom) => ({
    y: "150%",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
};

export const slideUpAnimation = {
  initial: { y: "150%", opacity: 0 },
  animate: (custom) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
  exit: (custom) => ({
    y: "150%",
    opacity: 0,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
};

export const megaMenuAnimation = {
  menuOpen: {
    height: "30vh",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuClosed: {
    height: "0vh",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
