import Image from 'next/image';
import React from 'react';

const Logo = () => {
	return (
		<div className='flex items-center bg-white p-2'>
			<h1 className='text-xl tracking-wider font-semibold'>SIAPRAK</h1>
			<Image
				priority
				alt='logo'
				width={200}
				height={200}
				src={'/FILKOM.png'}
				className='w-36'
			/>
		</div>
	);
};

export default Logo;
