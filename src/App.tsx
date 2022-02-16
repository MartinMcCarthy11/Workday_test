import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Managers, Type } from './ApiResponseTypes';
import { v4 as id } from 'uuid';
import SearchBar from './SearchBar';

export interface SearchResultItem {
	id: string;
	avatar: {} | null;
	name: string;
	level: string;
	email: string;
}

const apiUrl =
	'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

function App() {
	const [searchData, setSearchData] = useState<SearchResultItem[]>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<Managers>(apiUrl);
			const result = await initialFilter(response.data);
			setSearchData(result);
		};
		fetchData();
	}, []);

	const initialFilter = (data: Managers) => {
		let searchDataSet = [] as SearchResultItem[];
		let tempArr = [] as SearchResultItem[];
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
			} as SearchResultItem);
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
				} as SearchResultItem);
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
	return <SearchBar searchData={searchData!} />;
}

export default App;

/**
 * Stage 1.
 *
 * Get data from api - basic fetch request for now
 * create search input -= basic css for now
 * when user clicks on the search input showw all managers - basic item css for now
 *      - show only full name for now
 * restrict i to show just 2 at atime
 * create basic filter functionality
 *        - case insensitive
 *        - both names
 *
 * Basic component structure
 *      Manager search component
 *            --> searchbar component
 *                  --> arrow component
 *            --> search item component
 *
 *
 *
 *
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
