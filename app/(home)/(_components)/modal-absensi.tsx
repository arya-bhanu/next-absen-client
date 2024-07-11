"use client";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { CiCamera } from "react-icons/ci";
import clsx from "clsx";
import { toast } from "react-toastify";
import { FaTelegramPlane } from "react-icons/fa";
interface IModalAbsensi {
  statusAttendance: Set<string>;
  coordinate?: {
    long: number;
    lat: number;
  };
}
const startMessage =
  "Halo,%20Selamat%20pagi%0APerkenalkan%20saya%20<nama>%20dari%20kelas%20praktikum%20<kelas>%0AMemberitahukan%20bahwa%20saat%20ini%20saya%20tidak%20dapat%20mengikuti%20kelas%20dikarenakan%20<keterangan>";
const ModalAbsensi = (props: IModalAbsensi, ref: React.Ref<any>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalTitle, setModaltitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [vidStream, setVidStream] = useState<MediaStream | null>(null);
  const videoStream = useRef(null);
  const canvas = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      async handleOpenModal() {
        const selectedStatus = Array.from(props.statusAttendance)[0];

        if (selectedStatus) {
          switch (selectedStatus) {
            case "present":
              setModaltitle("Hai, Selalu semangat");
              await startCameraStream();
              break;
            case "permission":
              setModaltitle("Hai, Semoga harimu tetap baik");
              onOpen();
              break;
            case "sick":
              setModaltitle("Hai, Semoga cepat sembuh ya");
              onOpen();
              break;
            default:
              return;
          }
        }
      },
    };
  });

  function renderMaps(lat: number, long: number) {
    return (
      <iframe
        height={300}
        src={`//maps.google.com/maps?q=${lat},${long}&z=15&output=embed`}
        title="Google Maps"
      />
    );
  }

  async function startCameraStream() {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setVidStream(stream);
      setTimeout(() => {
        if (videoStream.current && stream) {
          (videoStream.current as HTMLVideoElement).srcObject = stream;
        }
      }, 100);
      onOpen();
    } catch (err) {
      toast.error("Please allow your camera browser and device");
    }
  }

  const takeSnapshot = useCallback(() => {
    if (!image) {
      if (canvas.current && videoStream.current) {
        const canvasEl = canvas.current as HTMLCanvasElement;

        canvasEl
          .getContext("2d")
          ?.drawImage(
            videoStream.current as HTMLVideoElement,
            0,
            0,
            canvasEl.width,
            canvasEl.height,
          );

        let image_data_url = canvasEl.toDataURL("image/jpeg");

        setImage(image_data_url);
      }
    } else {
      setImage(null);
    }
  }, [image]);

  function handleCloseModalAbsensi() {
    setImage(null);
    if (vidStream) {
      vidStream.getTracks().forEach((track) => track.stop());
    }
    onClose();
  }

  function renderBodyModal() {
    const selectedStatus = Array.from(props.statusAttendance)[0];

    switch (selectedStatus) {
      case "present":
        return (
          <div className="flex flex-col items-center">
            <div className="relative w-[320px] h-[240px]">
              <video
                ref={videoStream}
                autoPlay
                className={clsx(
                  "absolute left-0 top-0",
                  image ? "-z-20" : "z-40",
                )}
                height="240"
                id="video"
                width="320"
              />
              <canvas
                ref={canvas}
                className={clsx(
                  "absolute left-0 top-0",
                  image ? "z-40" : "-z-20",
                )}
                height="240"
                id="canvas"
                width="320"
              />
            </div>
            <div className="flex flex-col gap-y-4 w-fit mx-auto mt-5">
              <Button
                color="success"
                endContent={<CiCamera size={20} />}
                onClick={takeSnapshot}
              >
                {image ? "Replace Snapshot" : "Take Snapshot"}
              </Button>
            </div>
          </div>
        );
      case "permission":
        return (
          <form className="flex flex-col gap-5">
            <Textarea
              isRequired
              className=""
              label="Alasan izin"
              minRows={5}
              placeholder="Masukkan alasan anda izin"
            />

            {/* <Input type='file' /> */}
            <Tooltip content="Kontak asprak untuk pengecekan lebih lanjut">
              <Button
                className="w-fit text-white"
                color="primary"
                startContent={<FaTelegramPlane />}
              >
                <Link
                  href={`https://t.me/putubhanuartha_20?start=${startMessage}`}
                >
                  Kontak Asisten Praktikum
                </Link>
              </Button>
            </Tooltip>
            <h3 className="text-red-500 text-small">
              *Pastikan anda sudah melakukan kontak dengan asisten praktikum
            </h3>
          </form>
        );
      case "sick":
        return (
          <form className="flex flex-col gap-5">
            <Textarea
              isRequired
              className=""
              label="Alasan sakit"
              minRows={5}
              placeholder="Masukkan alasan anda sakit"
            />

            {/* <Input type='file' /> */}
            <Tooltip content="Kontak asprak untuk pengecekan lebih lanjut">
              <Button
                className="w-fit text-white"
                color="primary"
                startContent={<FaTelegramPlane />}
              >
                <Link
                  href={`https://t.me/putubhanuartha_20?start=${startMessage}`}
                >
                  Kontak Asisten Praktikum
                </Link>
              </Button>
            </Tooltip>
            <h3 className="text-red-500 text-small">
              *Pastikan anda sudah melakukan kontak dengan asisten praktikum
            </h3>
          </form>
        );
      default:
    }
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      scrollBehavior="outside"
      size={"2xl"}
      onClose={handleCloseModalAbsensi}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {modalTitle}
            </ModalHeader>
            <ModalBody>
              {props.coordinate &&
                renderMaps(props.coordinate.lat, props.coordinate.long)}
              {renderBodyModal()}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Tutup
              </Button>
              <Button className="text-white" color="success" onPress={onClose}>
                Konfirmasi
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ModalAbsensi);
