'use client';
import BasicContainer from '@/components/basic-container';
import { Avatar, Button, modal, Textarea } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import { siteConfig } from '../../config/site';
import { useCallback, useEffect, useRef, useState } from 'react';
import EmptyAbsensiState from '@/app/(home)/(_components)/empty-absensi-state';
import ListContainerAbsensi from '@/app/(home)/(_components)/list-container-absensi';
import { ApprovalStatus } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import useCreateQuery from '@/hooks/useCreateQuery';
import { CiCirclePlus } from 'react-icons/ci';
import ModalTambahKelas from './(_components)/modal-tambah-kelas';

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

const dataListAbsensi: IListAbsensiData[] = [
	{
		id: 1,
		is_recorded: false,
		class_finished_at: new Date(1720667661000),
		class_started_at: new Date(1720667661000),
		course: 'Pemrograman Web Dasar',
		course_code_class: 'CSD234',
		created_by: 'Putu Gde Arya Bhanuartha',
		nth_meeting: 1,
		topic: 'Dasar PHP',
		information: 'Memberikan latihan modul soal PHP',
		class_image: '/img/web.jpg',
	},
	{
		id: 2,
		is_recorded: false,
		class_finished_at: new Date(1720667661000),
		class_started_at: new Date(1720667661000),
		course: 'Pemrograman Web Dasar',
		course_code_class: 'CSD234',
		created_by: 'Putu Gde Arya Bhanuartha',
		nth_meeting: 2,
		topic: 'Dasar PHP dan Dasar pemrograman Client Web',
		information: 'Memberikan latihan modul soal PHP',
		class_image: '/img/web.jpg',
	},
];

export default function Home() {
	const params = useSearchParams();
	const router = useRouter();
	const qfilter = params.get('qfilter');
	const modalTambahKelasRef = useRef(null);

	const [selectedFilter, setSelectedFilter] = useState(
		new Set([qfilter ? qfilter : ''])
	);

	const queryCreated = useCreateQuery(
		selectedFilter,
		'qfilter',
		Array.from(selectedFilter)[0]
	);

	useEffect(() => {
		router.replace(`?${queryCreated}`, { scroll: false });
	}, [selectedFilter]);

	const handleSelectionChange = useCallback(
		(e: any) => {
			setSelectedFilter(new Set([e.target.value]));
		},
		[selectedFilter]
	);

	function handleClickTambahKelas() {
		const modalEl = modalTambahKelasRef.current as any;
		if (modalEl) {
			modalEl.openModalTambahKelas();
		}
	}

	return (
		<section className='flex flex-col gap-y-5'>
			<ModalTambahKelas ref={modalTambahKelasRef} />
			<BasicContainer className='flex flex-col gap-y-4'>
				<figure className='flex justify-between items-center'>
					<div>
						<h1 className='text-3xl font-semibold'>Welcome</h1>
						<h3 className='text-lg'>Putu Gde Arya Bhanuartha</h3>
					</div>
					<Avatar
						isBordered
						src='/img/404.jpg'
					/>
				</figure>
				<Button
					onClick={handleClickTambahKelas}
					startContent={<CiCirclePlus size={20} />}
					color='success'
					className='w-fit'
				>
					Tambah Kelas
				</Button>
				<form className='mt-2 flex flex-col gap-y-2'>
					<Textarea
						placeholder="It's your secret"
						label="Tell us how's your feeling today?"
					/>
					<Button
						type='submit'
						className='w-fit block ml-auto mt-2'
						variant='shadow'
						color='primary'
					>
						Submit
					</Button>
				</form>
			</BasicContainer>
			<BasicContainer>
				<h1 className='text-3xl mt-4 mb-3'>Absensi Hari Ini</h1>
				<Select
					size='sm'
					label='Semua Absensi'
					selectedKeys={selectedFilter}
					onChange={handleSelectionChange}
					className='max-w-xs'
				>
					{siteConfig.filterItems.map((el) => {
						return <SelectItem key={el.key}>{el.label}</SelectItem>;
					})}
				</Select>
				<div className='mb-6'>
					{/* <EmptyAbsensiState /> */}
					<ListContainerAbsensi
						listAbsensiData={dataListAbsensi}
						className='mt-8'
					/>
				</div>
			</BasicContainer>
		</section>
	);
}
