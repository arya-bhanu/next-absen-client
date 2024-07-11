import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { forwardRef, useImperativeHandle } from "react";

interface IModalTambahKelas {}
const ModalTambahKelas = (props: IModalTambahKelas, ref: React.Ref<any>) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useImperativeHandle(ref, () => {
    return {
      openModalTambahKelas() {
        onOpen();
      },
    };
  });

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Kode Kelas Praktikum
            </ModalHeader>
            <ModalBody>
              <Input
                label="Kode Kelas"
                placeholder="Masukkan kode kelas praktikum"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" onPress={onClose}>
                Konfirmasi
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ModalTambahKelas);
