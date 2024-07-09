import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const useCreateQuery = (dependency: any, key: string, value: string) => {
	const params = useSearchParams();
	return useMemo(() => {
		const newParams = new URLSearchParams(params.toString());
		newParams.set(key, value);
		return newParams.toString();
	}, [dependency]);
};

export default useCreateQuery;
