import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Managers } from './ApiResponseTypes';
import { SearchResultObj } from './App';
import { initialFilter } from './HandleApiData';

const ManagersContext = React.createContext({});
const apiUrl =
	'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

export function ManagersProvider({ children }: any) {
	const [searchData, setSearchData] = useState<SearchResultObj[]>();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<Managers>(apiUrl);
			const result = await initialFilter(response.data);
			setSearchData(result);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	return (
		<ManagersContext.Provider value={searchData!}>
			{children}
		</ManagersContext.Provider>
	);
}

export default ManagersContext;
