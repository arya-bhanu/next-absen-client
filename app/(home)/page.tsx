"use client";
import { Avatar, Button, Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";

import { siteConfig } from "../../config/site";

import ModalTambahKelas from "./(_components)/modal-tambah-kelas";
import ListContainerRecorded from "./(_components)/list-container-recorded";

import ListContainerAbsensi from "@/app/(home)/(_components)/list-container-absensi";
import { ApprovalStatus, AttendanceStatus } from "@/enums";
import useCreateQuery from "@/hooks/useCreateQuery";
import BasicContainer from "@/components/basic-container";

export interface IListAbsensiData {
  id: number;
  course_code_class: string;
  course: string;
  approved_status?: ApprovalStatus;
  created_by: string;
  class_started_at: Date;
  class_finished_at: Date;
  nth_meeting: number;
  is_recorded: boolean;
  topic: string;
  information?: string;
  class_image: string;
}

export type IListRecordedAbsensiData = IListAbsensiData & {
  attendance_status_request: AttendanceStatus;
  attendance_status_final?: AttendanceStatus;
};

const dataListAbsensi: IListAbsensiData[] = [
  {
    id: 1,
    is_recorded: false,
    class_finished_at: new Date(1720667661000),
    class_started_at: new Date(1720667661000),
    course: "Pemrograman Web Dasar",
    course_code_class: "CSD234",
    created_by: "Putu Gde Arya Bhanuartha",
    nth_meeting: 1,
    topic: "Dasar PHP",
    information: "Memberikan latihan modul soal PHP",
    class_image: "/img/web.jpg",
  },
  {
    id: 2,
    is_recorded: false,
    class_finished_at: new Date(1720667661000),
    class_started_at: new Date(1720667661000),
    course: "Pemrograman Web Dasar",
    course_code_class: "CSD234",
    created_by: "Putu Gde Arya Bhanuartha",
    nth_meeting: 2,
    topic: "Dasar PHP dan Dasar pemrograman Client Web",
    information: "Memberikan latihan modul soal PHP",
    class_image: "/img/web.jpg",
  },
];

const dataListRecordedAbsensi: IListRecordedAbsensiData[] = [
  {
    id: 1,
    is_recorded: false,
    class_finished_at: new Date(1720667661000),
    class_started_at: new Date(1720667661000),
    course: "Pemrograman Web Dasar",
    course_code_class: "CSD234",
    created_by: "Putu Gde Arya Bhanuartha",
    nth_meeting: 2,
    topic: "Dasar PHP dan Dasar pemrograman Client Web",
    information: "Memberikan latihan modul soal PHP",
    class_image: "/img/web.jpg",
    attendance_status_request: AttendanceStatus.present,
    approved_status: ApprovalStatus.granted,
    attendance_status_final: AttendanceStatus.present,
  },
  {
    id: 2,
    is_recorded: false,
    class_finished_at: new Date(1720667661000),
    class_started_at: new Date(1720667661000),
    course: "Pemrograman Web Dasar",
    course_code_class: "CSD234",
    created_by: "Putu Gde Arya Bhanuartha",
    nth_meeting: 2,
    topic: "Dasar PHP dan Dasar pemrograman Client Web",
    information: "Memberikan latihan modul soal PHP",
    class_image: "/img/web.jpg",
    attendance_status_request: AttendanceStatus.sick,
    approved_status: ApprovalStatus.waiting,
  },
  {
    id: 3,
    is_recorded: false,
    class_finished_at: new Date(1720667661000),
    class_started_at: new Date(1720667661000),
    course: "Pemrograman Web Dasar",
    course_code_class: "CSD234",
    created_by: "Putu Gde Arya Bhanuartha",
    nth_meeting: 2,
    topic: "Dasar PHP dan Dasar pemrograman Client Web",
    information: "Memberikan latihan modul soal PHP",
    class_image: "/img/web.jpg",
    attendance_status_request: AttendanceStatus.permission,
    approved_status: ApprovalStatus.rejected,
    attendance_status_final: AttendanceStatus.alpha,
  },
];

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();
  const qfilter = params.get("qfilter");
  const modalTambahKelasRef = useRef(null);

  const [selectedFilter, setSelectedFilter] = useState(
    new Set([qfilter ? qfilter : ""]),
  );

  const queryCreated = useCreateQuery(
    selectedFilter,
    "qfilter",
    Array.from(selectedFilter)[0],
  );

  useEffect(() => {
    router.replace(`?${queryCreated}`, { scroll: false });
  }, [selectedFilter]);

  const handleSelectionChange = useCallback(
    (e: any) => {
      setSelectedFilter(new Set([e.target.value]));
    },
    [selectedFilter],
  );

  function handleClickTambahKelas() {
    const modalEl = modalTambahKelasRef.current as any;

    if (modalEl) {
      modalEl.openModalTambahKelas();
    }
  }

  return (
    <section className="flex flex-col gap-y-5">
      <ModalTambahKelas ref={modalTambahKelasRef} />
      <BasicContainer className="flex flex-col gap-y-4">
        <figure className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Welcome</h1>
            <h3 className="text-lg">Putu Gde Arya Bhanuartha</h3>
          </div>
          <Avatar isBordered src="/img/404.jpg" />
        </figure>
        <Button
          className="w-fit"
          color="success"
          startContent={<CiCirclePlus size={20} />}
          onClick={handleClickTambahKelas}
        >
          Tambah Kelas
        </Button>
        <form className="mt-2 flex flex-col gap-y-2">
          <Textarea
            label="Tell us how's your feeling today?"
            placeholder="It's your secret"
          />
          <Button
            className="w-fit block ml-auto mt-2"
            color="primary"
            type="submit"
            variant="shadow"
          >
            Submit
          </Button>
        </form>
      </BasicContainer>
      <BasicContainer>
        <h1 className="text-3xl mt-4 mb-3">Absensi Hari Ini</h1>
        <Select
          className="max-w-xs"
          label="Semua Absensi"
          selectedKeys={selectedFilter}
          size="sm"
          onChange={handleSelectionChange}
        >
          {siteConfig.filterItems.map((el) => {
            return <SelectItem key={el.key}>{el.label}</SelectItem>;
          })}
        </Select>
        <div className="mb-6">
          {/* <EmptyAbsensiState /> */}
          <ListContainerAbsensi
            className="mt-8"
            listAbsensiData={dataListAbsensi}
          />
          <ListContainerRecorded
            className="mt-8"
            listAbsensiDataRecorded={dataListRecordedAbsensi}
          />
        </div>
      </BasicContainer>
    </section>
  );
}
