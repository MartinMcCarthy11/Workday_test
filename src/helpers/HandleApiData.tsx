import { SearchResultObj } from '../components/App';
import { Managers, Type } from '../types/ApiResponseTypes';

export const initialFilter = (data: Managers) => {
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
		(item, index, self) => index === self.findIndex((t) => t.id === item.id)
	);

	console.log(searchDataSet);
	return searchDataSet;
};
