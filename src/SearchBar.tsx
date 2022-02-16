import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchResultObj } from './App';
import SearchResultItem from './SearchResultItem';
import { v4 as id } from 'uuid';

interface Props {
	searchData: SearchResultObj[];
}

//Use Context api instead of passing the api respobnse down
function SearchBar({ searchData }: Props) {
	const [typedChar, setTypedChar] = useState('');
	const [filteredResult, setFilteredResult] = useState<SearchResultObj[]>([]);
	const [focusIndex, setFocusIndex] = useState(-1);

	const filter = (searchData: SearchResultObj[], searchTerm: string) => {
		let result = [] as SearchResultObj[];
		result = searchData.filter(({ name }) => {
			return name
				.replace(/\s/g, '')
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
		});

		if (result.length === 0) {
			result = searchData.filter(({ name }) => {
				return name.toLowerCase().includes(searchTerm.toLowerCase());
			});
		}
		return result;
	};

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const searchTerm = e.target.value;
		setTypedChar(searchTerm);
		const result = filter(searchData, searchTerm);

		if (searchTerm === '') {
			setFilteredResult([]);
		} else {
			setFilteredResult(result);
		}
	}

	function handleClick(e: React.MouseEvent<HTMLInputElement>) {
		const value = (e.target as HTMLInputElement).value;
		if (value === '') {
			setFilteredResult(searchData);
		}

		if (value.length > 0) {
			const searchTerm = value;
			const result = filter(searchData, searchTerm);
			setFilteredResult(result);
		}
	}

	function handleResultItemClick(e: React.MouseEvent<HTMLDivElement>) {
		const value = e.target as HTMLDivElement;
		const value1 = value as HTMLDivElement;
		setTypedChar(value1.getAttribute('data-name')!);
		setFilteredResult([]);
	}

	function handleBlur(e: React.FocusEvent) {
		e.persist();
		if (
			e.relatedTarget &&
			e.relatedTarget!.getAttribute('data-name')! !== ''
		) {
			setTypedChar(e.relatedTarget!.getAttribute('data-name')!);
			return;
		} else {
			setFilteredResult([]);
		}
	}

	// function handleKeyUp(e: React.KeyboardEvent) {
	// 	// if (e.key === 'Tab') {
	// 	// 	const value = e.target as HTMLDivElement;
	// 	// 	setTypedChar(value.getAttribute('data-name')!);
	// 	// }
	// 	// e.persist();
	// 	// console.log(e.relatedTarget);
	// 	// // if (e.relatedTarget && e.relatedTarget.id === '') {
	// 	// // 	return;
	// 	// // }
	// 	// console.log(e.key);
	// }

	const handleKeyBoardNavigation = (e: React.KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				if (focusIndex !== -1) {
					setTypedChar(filteredResult[focusIndex].name);
					setFilteredResult([]);
					return;
				}
				break;
			case 'ArrowUp':
				if (focusIndex > -1) {
					setFocusIndex(focusIndex - 1);
				}
				break;
			case 'ArrowDown':
				if (focusIndex < filteredResult.length - 1) {
					setFocusIndex(focusIndex + 1);
				}
				break;
		}
	};

	return (
		<SearchWrapper>
			<SearchInput
				type='text'
				id='searchBarId'
				value={typedChar}
				onChange={handleChange}
				onClick={handleClick}
				onBlur={handleBlur}
				onKeyDown={handleKeyBoardNavigation}
				autoComplete='off' // To be removed
			/>
			<SearchResultsContainer onClick={handleResultItemClick}>
				{filteredResult.length !== 0 &&
					filteredResult.map((item, index) => (
						<SearchResultItem
							focusIndex={focusIndex}
							index={index}
							item={item}
							key={id()}
						/>
					))}
			</SearchResultsContainer>
		</SearchWrapper>
	);
}

const SearchWrapper = styled.section`
	display: flex;
	flex-direction: column;
	width: 320px;
	min-width: 280px;
	margin: 50px auto;
`;

const SearchInput = styled.input`
	padding: 10px 10px 5px;
`;

const SearchResultsContainer = styled.div`
	height: 135px;
	overflow-x: hidden;
	padding: 2px 8px;

	::-webkit-scrollbar {
		display: none;
	}
`;

export default SearchBar;
