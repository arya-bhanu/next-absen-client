import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
const NotFound = () => {
	return (
		<section className='min-h-screen flex'>
			<div className='flex flex-col items-center m-auto'>
				<div className='relative max-w-[90%] sm:max-w-none w-screen h-[20rem] sm:h-[20rem] sm:w-[30rem] md:h-[30rem] md:w-[40rem]'>
					<Image
						alt='404-image'
						src={'/img/404.jpg'}
						fill
						className='object-cover sm:object-contain'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
					/>
				</div>
				<h1 className='text-4xl font-semibold text-center'>
					404 Page Not Found
				</h1>
				<Link
					href='/'
					className='mt-7 underline text-blue-600'
				>
					Go back Home
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
