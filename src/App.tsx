import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Managers, Type } from './ApiResponseTypes';
import SearchBar from './SearchBar';

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
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<Managers>(apiUrl);
			const result = await initialFilter(response.data);
			setSearchData(result);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const initialFilter = (data: Managers) => {
		let searchDataSet = [] as SearchResultObj[];
		let tempArr = [] as SearchResultObj[];
		let emailArray: string[] = [];

		//Filter Data.data  and map to SearchResultItem
		data.data.filter((item) => {
			if (item.attributes['Job Level'] == null) return null;
			return searchDataSet.push({
				id: item.id,
				avatar: item.attributes.avatar,
				name: item.attributes.name,
				level: item.attributes['Job Level'],
				email: '',
			} as SearchResultObj);
		});

		//Sort acsendingly
		searchDataSet.sort(function (a, b) {
			const nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase();
			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;
			return 0;
		});

		//Filter data.included to get emails and push into emailArray
		//Get employee types and push into tempArr
		data.included.filter((item) => {
			if (
				item.type !== Type.Employees &&
				!item.attributes.email?.includes('manager')
			) {
				emailArray.push(item.attributes.email!);
			}

			if (item.type === Type.Employees) {
				return tempArr.push({
					id: item.id,
					avatar: item.attributes.avatar,
					name: item.attributes.name,
					level: item.attributes['Job Level'],
					email: '',
				} as SearchResultObj);
			}
			return emailArray;
		});

		//Sort ascendingly
		emailArray.sort(function (a: string, b: string) {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		});

		//Iterate through filtered array and populate the email property for each element
		searchDataSet.map((item, index) => {
			item.email = emailArray[index];
			return item;
		});

		//Combine temp arr and filtered array
		searchDataSet = [...searchDataSet, ...tempArr];

		//Remove duplicate objects
		searchDataSet = searchDataSet.filter(
			(item, index, self) =>
				index === self.findIndex((t) => t.id === item.id)
		);

		console.log(searchDataSet);
		return searchDataSet;
	};
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
