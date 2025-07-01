export const menuAnimation = {
  overlayOpen: {
    opacity: 1,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  overlayClosed: {
    opacity: 0,
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuOpen: {
    right: "0%",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
  menuClosed: {
    right: "100%",
    transition: {
      duration: 0.75,
      delay: 0.5,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const textSlideAnimation = {
  initial: { y: "100%" },
  animate: (i) => ({
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.375 + 0.025 * i,
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
  animateNoCustom: {
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.375,
    },
  },
  exitNoCustom: {
    y: "100%",
    transition: {
      duration: 0.75,
      delay: 0.375,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const clipAnimation = {
  initial: { clipPath: "inset( 0% 0% 100% 0%)" },
  animate: (custom) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
  exit: {
    clipPath: "inset( 0% 0% 100% 0%)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const clipReelAnimation = {
  initial: { clipPath: "inset( 0% 0% 100% 0%)" },
  animate: (custom) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
  exit: {
    clipPath: "inset( 0% 0% 100% 0%)",
    transition: {
      duration: 0.75,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
export const opacityAnimation = {
  initial: { opacity: 0 },
  animate: (custom) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
      delay: custom,
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
};
export const textSlideSingleAnimation = {
  initial: { y: "100%" },
  animate: {
    y: "0%",

    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.3,
    },
  },
  exit: {
    y: "100%",
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};
