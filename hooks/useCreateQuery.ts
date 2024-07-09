import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const useCreateQuery = (dependency: any, key: string, value: string) => {
	const params = useSearchParams();
	return useMemo(() => {
		const newParams = new URLSearchParams(params.toString());
		if(value){
			newParams.set(key, value);
		}else{
			newParams.delete(key)
		}
		return newParams.toString();
	}, [dependency]);
};

export default useCreateQuery;
