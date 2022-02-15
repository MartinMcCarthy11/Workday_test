import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Included, Managers, Type } from './ApiResponse';
import { v4 as id } from 'uuid';

interface SearchResultItem {
	id: string;
	name: string;
	level: string;
	lastName: string;
	email: string;
}

const apiUrl =
	'https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json';

function App() {
	const [data, setData] = useState<Managers>();
	const [filteredData, setFilteredData] = useState<SearchResultItem[]>();

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<Managers>(apiUrl);
			const result = await initialFilter(response.data);
			setData(response.data);
			setFilteredData(result);
		};
		fetchData();
	}, []);

	const initialFilter = (data: Managers) => {
		let filteredArray = [] as SearchResultItem[];
		let completeEmployeesArr: Included[] = [];
		data.data.map((item: Included) => {
			if (item.type === Type.Employees) {
				completeEmployeesArr.push(item);
			}
			return completeEmployeesArr;
		});

		data.included.map((item) => {
			if (item.type === Type.Employees) {
				completeEmployeesArr.push(item);
			}
			return completeEmployeesArr;
		});

		completeEmployeesArr = completeEmployeesArr.filter(
			(item, index, self) =>
				index === self.findIndex((t) => t.id === item.id)
		);

		console.log(completeEmployeesArr);

		data.data.map((item) => {
			if (item.attributes['Job Level'] == null) return null;
			return filteredArray.push({
				id: id(),
				lastName: item.attributes.lastName,
				name: item.attributes.name,
				level: item.attributes['Job Level'],
				email: '',
			} as SearchResultItem);
		});

		filteredArray.sort(function (a, b) {
			const nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase();
			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;
			return 0;
		});

		let emailArray = [] as any;
		data.included
			.map((item) => {
				if (
					item.type !== Type.Employees &&
					!item.attributes.email?.includes('manager')
				) {
					emailArray.push(item.attributes.email);
				}
				return emailArray;
			})
			.sort(function (a: string, b: string) {
				if (a < b) return -1;
				if (a > b) return 1;
				return 0;
			});

		filteredArray.map((item, index) => {
			item.email = emailArray[index];
			return item;
		});

		console.log(emailArray);
		console.log(filteredArray);
		return filteredArray;
	};
	return (
		<div>
			<input type='text'></input>
			{/* {console.log(filteredData)} */}
			<div>
				{filteredData &&
					filteredData.map((item) => (
						<div key={item.id}>
							<p>Test</p>
							<h4>{item.name}</h4>
							<p>{item.level}</p>
							<p>{item.email}</p>
						</div>
					))}
			</div>
		</div>
	);
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
