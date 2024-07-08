import Sidebar from '@/components/sidebar';
import React, { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='relative flex flex-col h-screen'>
			<Sidebar />
			<main className='pl-60 bg-slate-100 xl:pl-72 2xl:pl-80 min-h-screen'>
				<div className='p-5 md:p-7 xl:p-10'>{children}</div>
			</main>
		</div>
	);
};

export default HomeLayout;
