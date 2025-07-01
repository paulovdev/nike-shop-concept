import React from "react";

const Footer = () => {
  return (
    <footer className=" flex items-center justify-between w-full px-5 bg-s z-50 select-none">
      <p className="text-t text-[10px] font-medium uppercase">
        © 2025 Nike, Inc. All Rights Reserved
      </p>
      <div className="flex items-center gap-8">
        <p className="text-t/75 text-[10px] font-medium uppercase">
          Terms of Sale
        </p>
        <p className="text-t/75 text-[10px] font-medium uppercase">
          Terms of Use
        </p>
      </div>
    </footer>
  );
};

export default Footer;
