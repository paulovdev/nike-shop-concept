import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
const PreLoader = () => {
  const controls = useAnimation();
  const [text, setText] = useState(false);

  const [count, setCount] = useState(0);

  const clipAnimation = {
    initial: { clipPath: "inset(100% 0% 0% 0%)" },
    animate: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 1,

        ease: "linear",
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
  useEffect(() => {
    const animation = async () => {
      setText(true);
      await controls.start({
        clipPath: "inset(0% 0% 0% 0%)",
        transition: {
          duration: 0.75,
          ease: [0.76, 0, 0.24, 1],
          delay: 1,
        },
      });
      setText(false);
      await controls.start({
        top: 0,
        height: "0vh",
        clipPath: "inset(0% 0% 10% 0%)",
        transition: {
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        },
      });
    };
    animation();
  }, []);

  useEffect(() => {
    if (count >= 100) return;

    const timeout = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 10);

    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <>
      <motion.div
        className="fixed w-screen h-[100dvh] inset-0 bg-t z-100"
        initial={{ clipPath: "inset(0px 0px 0px 0px)" }}
        animate={controls}
      >
        <motion.div
          className="size-full flex items-center justify-center  max-lg:flex-col"
          animate={{ y: !text && -150, transition: { duration: 1 } }}
        >
          <div className="size-full flex-[1.25] flex items-center bg-s max-lg:flex-[0.1] max-lg:order-1">
            <div className="w-full p-5 flex items-center justify-between">
              <p className="text-t text-[32px] font-bold uppercase">
                LOADING...
              </p>
              <p className="text-t text-[32px] font-bold font-azeret uppercase">
                {count}%
              </p>
            </div>
          </div>
          <div className="relative flex-[2] flex items-center justify-center h-[80px] overflow-hidden">
            <motion.div
              variants={clipAnimation}
              initial="initial"
              animate={text && "animate"}
            >
              <Image
                src={"/nike-logo.png"}
                width={1000}
                height={1000}
                alt=""
                className="w-[100px] h-[35px]"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default PreLoader;
