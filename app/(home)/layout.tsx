import Sidebar from '@/components/sidebar';
import React, { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='relative flex flex-col h-screen'>
			<Sidebar />
			<main className='pl-60 xl:pl-72 2xl:pl-80 min-h-screen'>{children}</main>
		</div>
	);
};

export default HomeLayout;
