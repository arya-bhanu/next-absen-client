import React from 'react';
import { IListAbsensiData } from '../page';
import Image from 'next/image';
import { FaChalkboardTeacher } from 'react-icons/fa';
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
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
const ListAbsensi = (props: IListAbsensiData) => {
	return (
		<li>
			<Card>
				<CardHeader className='flex gap-4 flex-col items-start'>
					<h1 className='text-lg font-semibold'>
						Pertemuan ke - {props.nth_meeting}
					</h1>
					<div className='flex justify-between flex-row w-full'>
						<div className='flex gap-3'>
							<Image
								alt='nextui logo'
								height={60}
								src={props.class_image}
								width={60}
								className='object-cover w-11 h-11 rounded-md'
							/>
							<div className='flex flex-col'>
								<p className='text-md'>{props.course}</p>
								<p className='text-small text-default-500'>
									{props.course_code_class}
								</p>
							</div>
						</div>
						<Chip
							startContent={<FaChalkboardTeacher />}
							size='sm'
						>
							{props.created_by}
						</Chip>

						<Chip
							color='warning'
							variant='dot'
						>
							{props.approved_status || (!props.is_recorded && 'Belum Terekam')}
						</Chip>
					</div>
				</CardHeader>
				<Divider />
				<CardBody className='flex justify-between flex-row'>
					<p>{props.topic}</p>
					<Select
						label='Status Kehadiran'
						className='max-w-xs'
						size='sm'
					>
						{siteConfig.attendanceStatus.map((el) => {
							return <SelectItem key={el.key}>{el.label}</SelectItem>;
						})}
					</Select>
				</CardBody>
				<Divider />
				<CardFooter className='flex flex-col items-start'>
					<p className='text-default-500'>{props.information}</p>
					<div className='w-full flex justify-between mt-5 items-center'>
						<div className='flex gap-3'>
							<Chip color='primary'>
								{props.class_started_at.toLocaleTimeString()}
							</Chip>
							<Chip color='danger'>
								{props.class_finished_at.toLocaleTimeString()}
							</Chip>
						</div>
						<Button
							color='success'
							className=' text-white block w-fit ml-auto'
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
