import React, { useRef, useState } from "react";
import Image from "next/image";
import { FaChalkboardTeacher } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { toast } from "react-toastify";

import { IListAbsensiData } from "../page";

import ModalAbsensi from "./modal-absensi";

import { siteConfig } from "@/config/site";
const ListAbsensi = (props: IListAbsensiData) => {
  const modalRef = useRef(null);
  const [statusAttendance, setStatusAttendance] = useState(new Set([""]));
  const [coordinate, setCoordinate] = useState<
    | {
        long: number;
        lat: number;
      }
    | undefined
  >(undefined);

  async function handleClickSubmit() {
    const selectedStatus = Array.from(statusAttendance)[0];

    if (selectedStatus) {
      switch (selectedStatus) {
        case "present":
          handlePresentStatus();
          break;
        case "permission":
          handleNotAttendance();
          break;
        case "sick":
          handleNotAttendance();
          break;
        default:
          return;
      }
    }
  }

  async function handlePresentStatus() {
    getLocation();
    await (modalRef.current as any).handleOpenModal();
  }

  async function handleNotAttendance() {
    getLocation();
    await (modalRef.current as any).handleOpenModal();
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, () => {
        toast.error("Please allow browser location");
      });
    } else {
      toast.error("Browser or device not supported for geolocation");
    }
  }

  async function showPosition(position: any) {
    setCoordinate({
      lat: position.coords.latitude as number,
      long: position.coords.longitude as number,
    });
  }

  return (
    <li>
      <ModalAbsensi
        ref={modalRef}
        coordinate={coordinate}
        statusAttendance={statusAttendance}
      />
      <Card>
        <CardHeader className="flex gap-4 flex-col items-start">
          <h1 className="text-lg font-semibold">
            Pertemuan ke - {props.nth_meeting}
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

            <Chip color="warning" variant="dot">
              {props.approved_status || (!props.is_recorded && "Belum Terekam")}
            </Chip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex justify-between flex-row">
          <p>{props.topic}</p>
          <Select
            className="max-w-xs"
            defaultSelectedKeys={statusAttendance}
            label="Status Kehadiran"
            size="sm"
            onSelectionChange={(keys) =>
              setStatusAttendance(keys as Set<string>)
            }
          >
            {siteConfig.attendanceStatus.map((el) => {
              return <SelectItem key={el.key}>{el.label}</SelectItem>;
            })}
          </Select>
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
            <Button
              className=" text-white block w-fit ml-auto"
              color="success"
              isDisabled={!Array.from(statusAttendance)[0]}
              onClick={handleClickSubmit}
            >
              Kirim
            </Button>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
};

export default ListAbsensi;
