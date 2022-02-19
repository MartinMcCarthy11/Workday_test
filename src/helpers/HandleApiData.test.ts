import {
	filterEmailArray,
	filterEmployees,
	filterEmployeesFromIncluded,
	sortEmailArray,
	sortEmployeeList,
} from './HandleApiData';

import * as TestData from '../json_test_data/test_data.json';
import { Managers } from '../types/ApiResponseTypes';
const mockResponse = TestData as unknown as Managers;

export interface SearchResultObj {
	id: string;
	avatar: {} | null;
	name: string;
	searchName: string;
	level: string;
	email: string;
}

const testSearchResultObj: SearchResultObj[] = [
	{
		id: '1',
		avatar: null,
		name: 'Frank Dunne',
		searchName: 'frankdunne',
		level: 'Manager',
		email: 'frank.dunne@test.ie',
	},
	{
		id: '2',
		avatar: null,
		name: 'Alice McCarthy',
		searchName: 'alicemccarthy',
		level: 'Manager',
		email: 'alice.mccarthy@test.ie',
	},
	{
		id: '3',
		avatar: null,
		name: 'Tom Deegan',
		searchName: 'tomdeegan',
		level: 'Manager',
		email: 'tom.deegan@test.ie',
	},
];

const testSortedSearchResultObj: SearchResultObj[] = [
	{
		id: '2',
		avatar: null,
		name: 'Alice McCarthy',
		searchName: 'alicemccarthy',
		level: 'Manager',
		email: 'alice.mccarthy@test.ie',
	},
	{
		id: '1',
		avatar: null,
		name: 'Frank Dunne',
		searchName: 'frankdunne',
		level: 'Manager',
		email: 'frank.dunne@test.ie',
	},
	{
		id: '3',
		avatar: null,
		name: 'Tom Deegan',
		searchName: 'tomdeegan',
		level: 'Manager',
		email: 'tom.deegan@test.ie',
	},
];

const testEmailArray = [
	'frank.dunne@test.ie',
	'alice.mccarthy@test.ie',
	'tom.deegan@test.ie',
];

const testSortedEmailArray = [
	'alice.mccarthy@test.ie',
	'frank.dunne@test.ie',
	'tom.deegan@test.ie',
];

it('Tests filterEmployees function return an SearchResultObj array when passed valid json', () => {
	expect(filterEmployees(mockResponse)).not.toBeNull();
	expect(filterEmployees(mockResponse)).toEqual(
		expect.arrayContaining([] as SearchResultObj[])
	);
});

it('Tests filterEmployeesFromIncluded function return an SearchResultObj array', () => {
	expect(filterEmployeesFromIncluded(mockResponse)).not.toBeNull();
	expect(filterEmployeesFromIncluded(mockResponse)).toEqual(
		expect.arrayContaining([] as SearchResultObj[])
	);
});

it('Tests sortEmployeeList function return an SearchResultObj array sorted by name', () => {
	expect(sortEmployeeList(testSearchResultObj)).toStrictEqual(
		testSortedSearchResultObj
	);
});

it('Tests filterEmailArray function return an string array', () => {
	expect(filterEmailArray(mockResponse)).not.toBeNull();
	expect(filterEmailArray(mockResponse)).toEqual(
		expect.arrayContaining([] as string[])
	);
});

it('Tests sortEmailArray function return an string array sorted', () => {
	expect(sortEmailArray(testEmailArray)).toStrictEqual(testSortedEmailArray);
});
