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
		<div className={clsx(['py-4 px-7 rounded-lg bg-white shadow-lg', className])}>
			{children}
		</div>
	);
};

export default BasicContainer;
