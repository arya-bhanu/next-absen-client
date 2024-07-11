'use client';
import React, {
	forwardRef,
	useCallback,
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
import clsx from 'clsx';
import { toast } from 'react-toastify';
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
						case 'present':
							setModaltitle('Hai, Selalu semangat');
							await startCameraStream();
							break;
						case 'permission':
							setModaltitle('Hai, Semoga harimu tetap baik');
							onOpen();
							break;
						case 'sick':
							setModaltitle('Hai, Semoga cepat sembuh ya');
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
			console.error(err);
			toast.error('Please allow your camera browser and device');
		}
	}

	const takeSnapshot = useCallback(() => {
		if (!image) {
			if (canvas.current && videoStream.current) {
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

	return (
		<Modal
			scrollBehavior='outside'
			backdrop='blur'
			size={'2xl'}
			isOpen={isOpen}
			onClose={handleCloseModalAbsensi}
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
							<div className='flex flex-col gap-y-4 w-fit mx-auto mt-5'>
								<div className='relative w-[320px] h-[240px]'>
									<video
										className={clsx(
											'absolute left-0 top-0',
											image ? '-z-20' : 'z-40'
										)}
										ref={videoStream}
										id='video'
										width='320'
										height='240'
										autoPlay
									></video>
									<canvas
										className={clsx(
											'absolute left-0 top-0',
											image ? 'z-40' : '-z-20'
										)}
										ref={canvas}
										id='canvas'
										width='320'
										height='240'
									></canvas>
								</div>

								<Button
									onClick={takeSnapshot}
									color='success'
									endContent={<CiCamera size={20} />}
								>
									{image ? 'Replace Snapshot' : 'Take Snapshot'}
								</Button>
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
