import { useCartStore } from "@/store/zustand";
import { CircleQuestionMark, Minus, Plus, Trash, X } from "lucide-react";

import { motion } from "framer-motion";
import { slideUpAnimation, cartAnimation } from "./animations";
import Image from "next/image";
import TextSlide from "@/components/reusable/text-slide";

const CartModal = ({ cartModal, setCartModal }) => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const total = cart.reduce((acc, item) => {
    const priceNumber = parseFloat(item.price.replace("$", ""));
    return acc + priceNumber * item.quantity;
  }, 0);

  return (
    <div className="fixed w-screen h-[100dvh] inset-0 flex items-center justify-between z-100">
      <div className="relative size-full flex-[1] max-ds:hidden"></div>
      <div className="relative size-full flex-[1.5] max-md:hidden"></div>
      <motion.div
        className="relative size-full flex-[1.5] bg-s z-50 select-none flex flex-col p-5  max-h-screen overflow-hidden max-lg:flex-[3]"
        variants={cartAnimation}
        initial="cartClosed"
        animate={cartModal && "cartOpen"}
        exit="cartClosed"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[12px] text-t font-semibold uppercase">
            <span className="font-bold">{cart.length} - </span> items in your
            bag.
          </h2>
          <div
            className="flex items-center gap-2 group"
            onClick={() => setCartModal(false)}
          >
            <TextSlide text="CLOSE" />
            <X
              size={18}
              className="text-t transition-all duration-500 group-hover:rotate-45"
            />
          </div>
        </div>
        <div className="w-full flex-1 mt-8 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-t text-[12px] font-bold uppercase size-full flex items-center justify-center">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item, i) => (
              <div
                key={`${cart}-${item.id}`}
                className="h-[100px] border-b border-bb overflow-hidden"
              >
                <motion.div
                  custom={i}
                  variants={slideUpAnimation}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center justify-between"
                >
                  <div className="flex-[4] flex items-center gap-6">
                    <Image
                      src={item.img}
                      width={100}
                      height={100}
                      alt={item.title}
                      className="w-[100px] h-[100px] object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="text-[8px] text-t/75 font-azeret font-bold uppercase tracking-[1px]">
                        {item.underTitle}
                      </span>
                      <p className="mb-1 text-t text-[14px] font-bold uppercase">
                        {item.title}
                      </p>
                      <div className="flex items-center">
                        <p className="text-[10px] text-t/75 font-medium uppercase">
                          {item.price}
                        </p>
                        <span className="mx-2 text-[10px] text-t/75 font-medium uppercase">
                          •
                        </span>
                        <p className="text-[10px] text-t/75 font-medium uppercase">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-[1]  flex items-end justify-end">
                    <div className="relative w-[100px] flex items-center ">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="p-1 h-6 bg-s hover:bg-gray-200 border border-bb outline-none"
                      >
                        <Minus size={12} className="text-t" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="block w-full p-1 h-6 border border-bb
                      text-[12px] font-medium font-azeret uppercase text-center outline-none placeholder:text-t
                      appearance-none
                      [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 h-6  bg-s hover:bg-gray-200 border border-bb outline-none"
                      >
                        <Plus size={12} className="text-t" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-[1] flex justify-end col-span-1">
                    <Trash
                      size={18}
                      className="text-t hover:text-red-500 transition-all duration-200"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </motion.div>
              </div>
            ))
          )}
        </div>
        <div className="pt-5 flex flex-col justify-end">
          <div className="mb-4 w-full h-0.5 bg-bb "></div>
          <div className="mb-1 w-full flex items-center justify-between">
            <p className="text-[10px] text-t/75 font-medium font-azeret uppercase flex items-center gap-2">
              Shipping & Taxes
              <CircleQuestionMark size={12} className="text-t" />
            </p>
            <p className="text-[10px] text-t/75 font-medium font-azeret uppercase">
              Calculated at checkout
            </p>
          </div>
          <div className="mb-1 w-full flex items-center justify-between">
            <h2 className="mb-4 text-[32px] text-t font-bold uppercase">
              SUBTOTAL
            </h2>
            <h2 className="mb-4 text-[32px] text-t font-bold uppercase">
              ${total.toFixed(2)}
            </h2>
          </div>
          <div className="w-full h-fit px-6 py-3 bg-f border text-center hover:bg-p hover:border-bb group transition-all duration-200">
            <p className="text-p text-[12px] font-medium font-azeret uppercase group-hover:text-t transition-all duration-200">
              PROCEED TO CHECKOUT
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed w-screen h-screen inset-0 backdrop-blur-md z-40"
        onClick={() => setCartModal(false)}
        variants={cartAnimation}
        initial="overlayClosed"
        animate={cartModal && "overlayOpen"}
        exit="overlayClosed"
      />
    </div>
  );
};

export default CartModal;
