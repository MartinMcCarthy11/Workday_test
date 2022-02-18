import { SearchResultObj } from '../components/App';
import { Managers, Type } from '../types/ApiResponseTypes';

export function filterEmployees(data: Managers): SearchResultObj[] {
	let result = [] as SearchResultObj[];
	data.data.filter((item) => {
		if (item.attributes['Job Level'] == null) return null;
		result.push({
			id: item.id,
			avatar: item.attributes.avatar,
			name: item.attributes.name,
			level: item.attributes['Job Level'],
			email: '',
		} as SearchResultObj);
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
				level: item.attributes['Job Level'],
				email: '',
			} as SearchResultObj);
		}
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

export function sortEmailArray(data: string[]) {
	let result = [] as string[];
	result = data.sort((a: string, b: string) => {
		if (a < b) return -1;
		if (a > b) return 1;
		return 0;
	});
	return result;
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
	transformedEmployeeList = removeDuplicateSearchResultObjects(
		transformedEmployeeList
	);

	console.log(transformedEmployeeList);
	return transformedEmployeeList;
};

//Explain that the data is a mismatch regarding ids, explain what i've done and what else you could do.
//More descriptive name transformed data set??
//implement via data.id then comment out and explain

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
