import React from 'react';
import Image from 'next/image';
const EmptyAbsensiState = () => {
	return (
		<div className='flex flex-col items-center'>
			<Image
				alt='empty image'
				src={'/img/empty.gif'}
				width={400}
				height={400}
			/>
			<h4 className='text-lg font-semibold'>Oops! Data absensi kosong</h4>
		</div>
	);
};

export default EmptyAbsensiState;
