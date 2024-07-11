import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center bg-white p-2">
      <h1 className="text-xl tracking-wider font-semibold">SIAPRAK</h1>
      <Image
        priority
        alt="logo"
        className="w-36"
        height={200}
        src={"/FILKOM.png"}
        width={200}
      />
    </div>
  );
};

export default Logo;
