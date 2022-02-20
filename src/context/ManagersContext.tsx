import React, { useEffect, useState } from 'react';
import { SearchResultObj } from '../api_helpers/HandleApiData';
import useGetApiData from '../hooks/useGetApiData';

const ManagersContext = React.createContext({});

export interface ValueContext {
	searchData?: SearchResultObj[];
	isLoading?: boolean;
}

export function ManagersProvider({ children }: any) {
	const [searchData, setSearchData] = useState<SearchResultObj[]>();
	const [isLoading, setIsLoading] = useState(true);
	const searchDataResponse = useGetApiData();

	useEffect(() => {
		if (searchDataResponse != null) {
			setSearchData(searchDataResponse);
			setIsLoading(false);
		}
	}, [searchDataResponse]);

	const value: ValueContext = {
		searchData,
		isLoading,
	};
	return (
		<ManagersContext.Provider value={value}>
			{children}
		</ManagersContext.Provider>
	);
}

export default ManagersContext;
