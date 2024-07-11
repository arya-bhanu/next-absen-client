import React from "react";
import clsx from "clsx";

import { IListAbsensiData } from "../page";

import ListAbsensi from "./list-absensi";
const ListContainerAbsensi = ({
  className,
  listAbsensiData,
}: {
  className?: string;
  listAbsensiData: IListAbsensiData[];
}) => {
  return (
    <ul className={clsx(className, "flex flex-col gap-y-7")}>
      {listAbsensiData.map((el) => {
        return <ListAbsensi key={el.id} {...el} />;
      })}
    </ul>
  );
};

export default ListContainerAbsensi;
