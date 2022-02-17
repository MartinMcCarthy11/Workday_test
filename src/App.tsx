import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Managers, Type } from './ApiResponseTypes';
import SearchBar from './SearchBar';
import { initialFilter } from './HandleApiData';
import ManagersContext from './ManagersContext';

export interface SearchResultObj {
	id: string;
	avatar: {} | null;
	name: string;
	level: string;
	email: string;
}

const apiUrl =
	'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

function App() {
	const [searchData, setSearchData] = useState<SearchResultObj[]>();
	const [isLoading, setIsLoading] = useState(true);
	// const context = useContext(ManagersContext) as SearchResultObj[];
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<Managers>(apiUrl);
			const result = await initialFilter(response.data);
			setSearchData(result);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return <SearchBar disabled={isLoading} searchData={searchData!} />;
}

export default App;

/**
 * Stage 1.
 *
 * Get data from api - basic fetch request for now --DONE
 * create search input -= basic css for now -- DONE
 * when user clicks on the search input show all managers - basic item css for now -- DONE
 *      - show only full name for now -- DONE
 * restrict i to show just 2 at atime -- DONE
 * create basic filter functionality -- DONE
 *        - case insensitivE -- DONE
 *        - both names -- dONE
 * 
 * Stage 2.
 * 
 * Enhance filtering functionality to match all requirements  --DONE
 * Add keyboard navigation -- DONE
 * Add focus requirements -- DONE
 *
 * Basic component structure
 *      Manager search component
 *            --> searchbar component
 *                  --> arrow component
 *            --> search item component
 *
 * **** BUGS ****
 * TODO : when you navigate down with keyboard list should scroll with you 
 * disable input while loading -- FIXED
 * 
 * 


 * 
 ******Things to look into again if i have time
 * -- selecting by data-name
 * 				-- could possibly get key and then search for that key in list returning name value
 *-- can i use props in styled components without passing them to the wrapper?
 *-- 
 *
 * *****Things to consider
 * -- performance
 *      -- cache api response
 *      -- useReducer and usecallback, useMemo
 *      -- check for uneseccary renders
 *      -- research common performance issues with search bars
 * -- security
 *      -- cant insert code in search bar
 *      -- research common security issues with search bars
 *
 *
 */
