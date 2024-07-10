import React, { forwardRef, useImperativeHandle } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Button,
} from '@nextui-org/react';
const ModalAbsensi = (props: any, ref: React.Ref<any>) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	useImperativeHandle(ref, () => {
		return {
			handleOpenModal() {
				onOpen();
			},
		};
	});
	return (
		<Modal
			size={'2xl'}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Modal Title
						</ModalHeader>
						<ModalBody>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
								pulvinar risus non risus hendrerit venenatis. Pellentesque sit
								amet hendrerit risus, sed porttitor quam.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
								pulvinar risus non risus hendrerit venenatis. Pellentesque sit
								amet hendrerit risus, sed porttitor quam.
							</p>
							<p>
								Magna exercitation reprehenderit magna aute tempor cupidatat
								consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
								incididunt cillum quis. Velit duis sit officia eiusmod Lorem
								aliqua enim laboris do dolor eiusmod.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='light'
								onPress={onClose}
							>
								Close
							</Button>
							<Button
								color='primary'
								onPress={onClose}
							>
								Action
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default forwardRef(ModalAbsensi);
