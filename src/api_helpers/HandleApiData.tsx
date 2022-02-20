import { Managers, Type } from '../types/ApiResponseTypes';

export interface SearchResultObj {
	id: string;
	avatar: {} | null;
	name: string;
	searchName: string;
	level: string;
	email: string;
}

export function filterEmployees(data: Managers): SearchResultObj[] {
	let result = [] as SearchResultObj[];
	data.data.filter((item) => {
		if (item.attributes['Job Level'] == null) return null;
		result.push({
			id: item.id,
			avatar: item.attributes.avatar,
			name: item.attributes.name,
			searchName: item.attributes.firstName
				.concat(item.attributes.lastName)
				.toLowerCase(),
			level: item.attributes['Job Level'],
			email: '',
		} as SearchResultObj);
		return null;
	});
	return result;
}

export function filterEmployeesFromIncluded(data: Managers): SearchResultObj[] {
	let result = [] as SearchResultObj[];
	data.included.filter((item) => {
		if (item.type === Type.Employees) {
			result.push({
				id: item.id,
				avatar: item.attributes.avatar,
				name: item.attributes.name,
				searchName: item.attributes
					.firstName!.concat(item.attributes.lastName!)
					.toLowerCase(),
				level: item.attributes['Job Level'],
				email: '',
			} as SearchResultObj);
		}
		return null;
	});
	return result;
}

export function sortEmployeeList(data: SearchResultObj[]): SearchResultObj[] {
	data.sort(function (a, b) {
		const nameA = a.name.toLowerCase(),
			nameB = b.name.toLowerCase();
		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});
	return data;
}

export function filterEmailArray(data: Managers) {
	let result = [] as string[];
	data.included.filter((item) => {
		if (
			item.type !== Type.Employees &&
			!item.attributes.email?.includes('manager')
		) {
			result.push(item.attributes.email!);
		}
		return null;
	});

	return result;
}

export function sortEmailArray(data: string[]) {
	let result = [] as string[];
	result = data.sort((a: string, b: string) => {
		if (a < b) return -1;
		if (a > b) return 1;
		return 0;
	});
	return result;
}

export function populateSearchItemWithEmail(
	transformedEmployeeList: SearchResultObj[],
	emailArray: string[]
) {
	transformedEmployeeList = transformedEmployeeList.map(
		(item: SearchResultObj, index: number) => {
			item.email = emailArray[index];
			return item;
		}
	);
	return transformedEmployeeList;
}

export function removeDuplicateSearchResultObjects(
	transformedEmployeeList: SearchResultObj[]
) {
	let result = [] as SearchResultObj[];
	result = transformedEmployeeList.filter(
		(item, index, self) => index === self.findIndex((t) => t.id === item.id)
	);
	return result;
}

export const initialFilter = (data: Managers) => {
	let transformedEmployeeList = [] as SearchResultObj[];
	let tempArray = [] as SearchResultObj[];
	let emailArray = [] as string[];

	//Filter Data.data  and map to SearchResultItem
	transformedEmployeeList = filterEmployees(data);

	//Sort ascending
	transformedEmployeeList = sortEmployeeList(transformedEmployeeList);

	//Filter data.included to get emails and push into emailArray
	emailArray = filterEmailArray(data);

	//Get employee types and push into tempArr
	tempArray = filterEmployeesFromIncluded(data);

	//Sort ascending
	emailArray = sortEmailArray(emailArray);

	//Iterate through filtered array and populate the email property for each element
	transformedEmployeeList = populateSearchItemWithEmail(
		transformedEmployeeList,
		emailArray
	);

	//Combine temp arr and filtered array
	transformedEmployeeList = [...transformedEmployeeList, ...tempArray];

	//Remove any duplicate objects
	transformedEmployeeList = removeDuplicateSearchResultObjects(
		transformedEmployeeList
	);
	return transformedEmployeeList;
};

/**
 * Below is the process for manipulating the object {type: accounts} id and then comparing employees by id.
 * As mentioned in the readme I have not taken this approach as it works off the assumption that all of the data we receive will also be off by 1.
 * In a true production setting I would investigate and correct the data at source and then match the email to the employee by id.
 */

// interface emailObj {
// 	email: string;
// 	id: string;
// }

// export const initialFilter = (data: Managers) => {
// 	let transformedEmployeeList = [] as SearchResultObj[];
// 	let tempArray = [] as SearchResultObj[];
// 	let emailArray: emailObj[] = [];

// 	//Filter Data.data  and map to SearchResultItem
// 	data.data.filter((item) => {
// 		if (item.attributes['Job Level'] == null) return null;
// 		return transformedEmployeeList.push({
// 			id: item.id,
// 			avatar: item.attributes.avatar,
// 			name: item.attributes.name,
// 			level: item.attributes['Job Level'],
// 			email: '',
// 		} as SearchResultObj);
// 	});

// 	data.included.filter((item) => {
// 		if (
// 			item.type !== Type.Employees &&
// 			!item.attributes.email?.includes('manager')
// 		) {
// 			emailArray.push({
// 				email: item.attributes.email!,
// 				id: (Number(item.id) - 1).toString(), // Manipulating the ID attribute to correct data error
// 			});
// 		}

// 		if (item.type === Type.Employees) {
// 			return tempArray.push({
// 				id: item.id,
// 				avatar: item.attributes.avatar,
// 				name: item.attributes.name,
// 				level: item.attributes['Job Level'],
// 				email: '',
// 			} as SearchResultObj);
// 		}
// 		return emailArray;
// 	});

// 	transformedEmployeeList.forEach((item, index) => {
// 		emailArray.forEach((email) => {
// 			if (item.id === email.id) {
// 				item.email = email.email;
// 			}
// 		});
// 	});

// 	transformedEmployeeList = [...transformedEmployeeList, ...tempArray];

// 	transformedEmployeeList = transformedEmployeeList.filter(
// 		(item, index, self) => index === self.findIndex((t) => t.id === item.id)
// 	);

// 	console.log(transformedEmployeeList);

// 	return transformedEmployeeList;
// };
