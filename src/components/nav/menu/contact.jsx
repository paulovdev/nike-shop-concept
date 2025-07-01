import {
  clipReelAnimation,
  opacityAnimation,
  textSlideAnimation,
  textSlideSingleAnimation,
} from "./animations";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      className="size-full p-5"
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={0.2}
    >
      <div className="mb-4 h-fit overflow-hidden">
        <motion.h2
          className="text-t text-[42px] font-bold uppercase"
          variants={textSlideSingleAnimation}
          initial="initial"
          animate="animate"
        >
          CONTACT US
        </motion.h2>
      </div>

      <div className="mb-8">
        {[
          " Please fill in this form to send us a message. Our Customer Care",
          "    Advisors will be happy to assist you with your query.",
        ].map((text, i) => (
          <div key={i} className="h-fit overflow-hidden">
            <motion.p
              className="text-t/75 text-[12px] font-azeret"
              variants={textSlideAnimation}
              initial="initial"
              animate="animate"
              custom={i}
            >
              {text}
            </motion.p>
          </div>
        ))}
      </div>
      <div className="size-full flex flex-col">
        <motion.div
          className="flex flex-col items-start justify-start gap-4"
          variants={clipReelAnimation}
          initial="initial"
          animate="animate"
          custom={0.8}
        >
          <label
            htmlFor="name"
            className="text-t text-[12px] font-medium font-azeret uppercase"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            autocomplete="off"
            className="w-full h-fit px-4 py-2  border border-bb bg-s outline-none text-t text-[12px] font-azeret uppercase"
          />

          <label
            htmlFor="email"
            className="text-t text-[12px] font-medium font-azeret uppercase"
          >
            E-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            autocomplete="off"
            className="w-full h-fit px-4 py-2 border border-bb bg-s outline-none text-t text-[12px] font-azeret uppercase"
          />

          <label
            htmlFor="tel"
            className="text-t text-[12px] font-medium font-azeret uppercase"
          >
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="tel"
            autocomplete="off"
            className="w-full h-fit px-4 py-2 border border-bb bg-s outline-none text-t text-[12px] font-azeret uppercase"
          />

          <label
            htmlFor="message"
            className="text-t text-[12px] font-medium font-azeret uppercase"
          >
            message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            maxLength={400}
            className="w-full h-[125px] px-4 py-2 border border-bb bg-s outline-none text-t text-[12px] font-azeret uppercase resize-none"
          />

          <label className="flex items-center">
            <input type="checkbox" id="check" className="mr-4" />
            <div className="">
              {[
                "I confirm that I accept the Conditions of Use and have read and understood the",
                "Privacy Policy and Cookie Policy.",
              ].map((text, i) => (
                <div key={i} className="h-fit overflow-hidden">
                  <motion.p
                    className="text-t/75 text-[10px] font-azeret"
                    variants={textSlideAnimation}
                    initial="initial"
                    animate="animate"
                    custom={i}
                  >
                    {text}
                  </motion.p>
                </div>
              ))}
            </div>
          </label>
        </motion.div>
        <motion.button
          className="mt-8 w-full h-fit px-6 py-2 bg-t border border-bb text-p text-[12px] font-medium font-azeret uppercase 
          hover:text-t hover:bg-s transition-all duration-200"
          variants={opacityAnimation}
          initial="initial"
          animate="animate"
          custom={0.5}
        >
          SUBMIT
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Contact;
