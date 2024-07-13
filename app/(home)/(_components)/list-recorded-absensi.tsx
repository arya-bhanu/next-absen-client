import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import React from "react";
import Image from "next/image";
import { FaChalkboardTeacher } from "react-icons/fa";
import clsx from "clsx";

import { IListRecordedAbsensiData } from "../page";

import { ApprovalStatus, AttendanceStatus } from "@/enums";
import BoxLabel from "@/components/box-label";

const ListRecordedAbsensi = (props: IListRecordedAbsensiData) => {
  function setColorChip() {
    switch (props.approved_status) {
      case ApprovalStatus.rejected:
        return "danger";
      case ApprovalStatus.granted:
        return "success";
      case ApprovalStatus.waiting:
        return "warning";
      default:
    }
  }

  function setBgColorLabelAttendance() {
    switch (props.attendance_status_request) {
      case AttendanceStatus.permission:
        return "bg-yellow-500";
      case AttendanceStatus.present:
        return "bg-green-500";
      case AttendanceStatus.sick:
        return "bg-red-500";
    }
  }

  return (
    <li>
      <Card>
        <CardHeader className="flex gap-4 flex-col items-start">
          <h1 className="text-lg font-semibold flex flex-col gap-2">
            <span> Pertemuan ke - {props.nth_meeting}</span>
            {props.attendance_status_final && (
              <Chip color="success" variant="faded">
                [FINAL : {props.attendance_status_final}]
              </Chip>
            )}
          </h1>
          <div className="flex justify-between flex-row w-full">
            <div className="flex gap-3">
              <Image
                alt="nextui logo"
                className="object-cover w-11 h-11 rounded-md"
                height={60}
                src={props.class_image}
                width={60}
              />
              <div className="flex flex-col">
                <p className="text-md">{props.course}</p>
                <p className="text-small text-default-500">
                  {props.course_code_class}
                </p>
              </div>
            </div>
            <Chip size="sm" startContent={<FaChalkboardTeacher />}>
              {props.created_by}
            </Chip>

            <Chip color={setColorChip()} variant="dot">
              {props.approved_status || (!props.is_recorded && "Belum Terekam")}
            </Chip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex justify-between flex-row">
          <p>{props.topic}</p>
          <BoxLabel className={clsx(setBgColorLabelAttendance())}>
            {props.attendance_status_request}
          </BoxLabel>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col items-start">
          <p className="text-default-500">{props.information}</p>
          <div className="w-full flex justify-between mt-5 items-center">
            <div className="flex h-5 items-center gap-2">
              <Chip color="success">
                {props.class_started_at.toLocaleDateString()}
              </Chip>
              <Divider orientation="vertical" />
              <Chip color="primary">
                {props.class_started_at.toLocaleTimeString()}
              </Chip>
              <Divider orientation="vertical" />
              <Chip color="danger">
                {props.class_finished_at.toLocaleTimeString()}
              </Chip>
            </div>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};

export default ListRecordedAbsensi;
