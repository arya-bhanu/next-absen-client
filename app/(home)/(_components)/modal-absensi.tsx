'use client';
import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Button,
} from '@nextui-org/react';

import { CiCamera } from 'react-icons/ci';
interface IModalAbsensi {
	statusAttendance: Set<string>;
	coordinate?: {
		long: number;
		lat: number;
	};
}
const ModalAbsensi = (props: IModalAbsensi, ref: React.Ref<any>) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [modalTitle, setModaltitle] = useState('');
	const videoStream = useRef(null);
	const canvas = useRef(null);
	useImperativeHandle(ref, () => {
		return {
			async handleOpenModal() {
				onOpen();
				const selectedStatus = Array.from(props.statusAttendance)[0];
				if (selectedStatus) {
					switch (selectedStatus) {
						case 'present':
							setModaltitle('Hai, Selalu semangat');
							await startCameraStream();
							break;
						case 'permission':
							setModaltitle('Hai, Semoga harimu tetap baik');
							break;
						case 'sick':
							setModaltitle('Hai, Semoga cepat sembuh ya');
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
			/>
		);
	}

	async function startCameraStream() {
		let stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		});
		if (videoStream.current && stream) {
			(videoStream.current as HTMLVideoElement).srcObject = stream;
		}
	}

	function takeSnapshot() {
		if (canvas.current && videoStream.current) {
			console.log('Hello');
			const canvasEl = canvas.current as HTMLCanvasElement;
			canvasEl
				.getContext('2d')
				?.drawImage(
					videoStream.current as HTMLVideoElement,
					0,
					0,
					canvasEl.width,
					canvasEl.height
				);
			let image_data_url = canvasEl.toDataURL('image/jpeg');

			// data url of the image
			console.log(image_data_url);
		}
	}

	return (
		<Modal
			scrollBehavior='outside'
			backdrop='blur'
			size={'2xl'}
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							{modalTitle}
						</ModalHeader>
						<ModalBody>
							{props.coordinate &&
								renderMaps(props.coordinate.lat, props.coordinate.long)}
							<div>
								<video
									className='mt-3'
									ref={videoStream}
									id='video'
									width='320'
									height='240'
									autoPlay
								></video>
								<Button
									onClick={takeSnapshot}
									color='success'
									endContent={<CiCamera size={20} />}
									className='mt-3'
								>
									Take Snapshot
								</Button>
								<canvas
									ref={canvas}
									id='canvas'
									width='320'
									height='240'
								></canvas>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='light'
								onPress={onClose}
							>
								Tutup
							</Button>
							<Button
								color='primary'
								onPress={onClose}
							>
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
