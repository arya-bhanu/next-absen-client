import React from "react";
import clsx from "clsx";

import { IListRecordedAbsensiData } from "../page";

import ListRecordedAbsensi from "./list-recorded-absensi";

const ListContainerRecorded = ({
  className,
  listAbsensiDataRecorded,
}: {
  className?: string;
  listAbsensiDataRecorded: IListRecordedAbsensiData[];
}) => {
  return (
    <ul className={clsx(className, "flex flex-col gap-y-7")}>
      {listAbsensiDataRecorded.map((el) => {
        return <ListRecordedAbsensi key={el.id} {...el} />;
      })}
    </ul>
  );
};

export default ListContainerRecorded;
