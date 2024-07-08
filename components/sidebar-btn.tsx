'use client';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const SidebarButton = ({
	children,
	link,
}: {
	children: ReactNode;
	link: string;
}) => {
	const path = usePathname();
	return (
		<Link
			href={link}
			className={clsx(
				'py-3 px-4 rounded-md transition-all duration-300  hover:bg-white hover:text-black',
				path === link ? 'bg-white text-black' : 'text-white bg-transparent'
			)}
		>
			{children}
		</Link>
	);
};

export default SidebarButton;
