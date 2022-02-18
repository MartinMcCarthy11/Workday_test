import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchResultObj } from '../components/App';
import { initialFilter } from '../helpers/HandleApiData';
import { Managers } from '../types/ApiResponseTypes';

const apiUrl =
	'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

function useGetApiData() {
	const [searchData, setSearchData] = useState<SearchResultObj[]>();
	useEffect(() => {
		(async () => {
			const response = await axios.get<Managers>(apiUrl);
			const result = await initialFilter(response.data);
			setSearchData(result);
		})();
	}, []);

	return searchData;
}

export default useGetApiData;
