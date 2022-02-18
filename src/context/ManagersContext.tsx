import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { SearchResultObj } from '../components/App';
import { initialFilter } from '../helpers/HandleApiData';
import { Managers } from '../types/ApiResponseTypes';

const ManagersContext = React.createContext({});

export function ManagersProvider({ children }: any) {
	const [data, setData] = useState();
	function saveFilteredData(filteredData: any) {
		return setData(filteredData);
	}

	const value = {
		saveFilteredData,
	};
	return (
		<ManagersContext.Provider value={value}>
			{children}
		</ManagersContext.Provider>
	);
}

export default ManagersContext;
