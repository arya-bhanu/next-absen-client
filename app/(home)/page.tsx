'use client';
import BasicContainer from '@/components/basic-container';
import { Avatar, Button, Textarea, SelectSection } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import { siteConfig } from '../../config/site';
import { useState } from 'react';
import Image from 'next/image';
import EmptyAbsensiState from '@/components/empty-absensi-state';
export default function Home() {
	const [selectedFilter, setSelectedFilter] = useState(new Set(['ongoing']));

	const handleSelectionChange = (e: any) => {
		setSelectedFilter(new Set([e.target.value]));
	};
	return (
		<section className='flex flex-col gap-y-5'>
			<BasicContainer>
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
				<form className='mt-2 flex flex-col gap-y-2'>
					<Textarea
						placeholder="It's your secret"
						label="Tell us how's your feeling today?"
					/>
					<Button
						type='submit'
						className='w-fit block ml-auto'
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
					label='Filter Absensi'
					selectedKeys={selectedFilter}
					onChange={handleSelectionChange}
					className='max-w-xs'
				>
					{siteConfig.filterItems.map((el) => {
						return <SelectItem key={el.key}>{el.label}</SelectItem>;
					})}
				</Select>
				<div className='mb-6'>
					<EmptyAbsensiState />
				</div>
			</BasicContainer>
		</section>
	);
}
