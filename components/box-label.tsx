import clsx from "clsx";
import React, { ReactNode } from "react";

const BoxLabel = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx(className, "py-2 px-8 rounded-lg text-white")}>
      <h3>{children}</h3>
    </div>
  );
};

export default BoxLabel;
