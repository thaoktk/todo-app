const animations = {
  header: {
    initial: {
      y: -100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 700,
    },
  },
  page: {
    initial: {
      x: 100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 700,
    },
  },
  item: {
    initial: {
      y: -50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    transition: {
      duration: 1,
      ease: "easeOut",
      type: "spring",
      stiffness: 700,
    },
    exit: {
      y: -50,
      opacity: 0,
    },
  },
  todoItem: {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
    exit: {
      x: 100,
      opacity: 0,
    },
  },
};

export default animations;
