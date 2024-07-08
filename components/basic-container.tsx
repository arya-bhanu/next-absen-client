import clsx from 'clsx';
import React, { ReactNode } from 'react';

const BasicContainer = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={clsx(['p-4 rounded-lg bg-white shadow-lg', className])}>
			{children}
		</div>
	);
};

export default BasicContainer;
