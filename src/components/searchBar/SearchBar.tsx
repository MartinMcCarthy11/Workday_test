import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SearchResultObj } from '../App';
import SearchResultItem from './SearchResultItem';
import { v4 as id } from 'uuid';

interface Props {
	searchData: SearchResultObj[];
	disabled: boolean;
}

//Use Context api instead of passing the api respobnse down
function SearchBar({ searchData, disabled }: Props) {
	const [typedChar, setTypedChar] = useState('');
	const [filteredResult, setFilteredResult] = useState<SearchResultObj[]>([]);
	const [focusIndex, setFocusIndex] = useState(-1);
	const [isVisible, setVisibility] = useState(true);

	const searchResultContainerRef = useRef<HTMLUListElement>(null);

	const scrollIntoView = (position: number) => {
		if (searchResultContainerRef) {
			const parentElement = searchResultContainerRef.current!
				.parentElement as HTMLUListElement;

			parentElement.scrollTo({
				top: position - 84,
				behavior: 'smooth',
			});
		}
	};

	useEffect(() => {
		if (
			focusIndex < 0 ||
			focusIndex > filteredResult.length ||
			!searchResultContainerRef
		) {
			return () => {};
		}
		if (searchResultContainerRef) {
			let listItems = Array.from(
				searchResultContainerRef!.current!.children
			);

			listItems[focusIndex] &&
				scrollIntoView(
					(listItems[focusIndex] as HTMLElement).offsetTop
				);
		}
	}, [filteredResult.length, focusIndex]);

	const showSearchResults = () => setVisibility(true);

	const hideSearchResults = () => setVisibility(false);

	function filter(searchData: SearchResultObj[], searchTerm: string) {
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
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const searchTerm = e.target.value;
		setTypedChar(searchTerm);
		const result = filter(searchData, searchTerm);

		if (searchTerm === '') {
			hideSearchResults();
		} else {
			setFocusIndex(-1);
			scrollIntoView(0);
			setFilteredResult(result);
			showSearchResults();
		}
	}

	function handleClick(e: React.MouseEvent<HTMLInputElement>) {
		const value = (e.target as HTMLInputElement).value;
		if (value === '') {
			setFilteredResult(searchData);
			showSearchResults();
		}

		if (value.length > 0) {
			const searchTerm = value;
			const result = filter(searchData, searchTerm);
			setFocusIndex(-1);
			scrollIntoView(0);
			setFilteredResult(result);
			showSearchResults();
		}
	}

	function handleResultItemClick(e: React.MouseEvent<HTMLDivElement>) {
		const value = e.target as HTMLDivElement;
		setTypedChar(value.getAttribute('data-name')!);
		hideSearchResults();
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
			hideSearchResults();
		}
	}

	function handleKeyBoardNavigation(e: React.KeyboardEvent) {
		switch (e.key) {
			case 'Enter':
				if (focusIndex !== -1) {
					setTypedChar(filteredResult[focusIndex].name);
					hideSearchResults();
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
	}

	// const SearchResultItemMemo = useCallback(SearchResultItem, []);
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
				disabled={disabled}
			/>
			<SearchResultsContainer
				onClick={handleResultItemClick}
				isVisible={isVisible}
			>
				<SearchResultList ref={searchResultContainerRef}>
					{filteredResult.length !== 0 &&
						filteredResult.map((item, index) => (
							<SearchResultItem
								item={item}
								key={id()}
								isHighlighted={
									focusIndex === index ? true : false
								}
							/>
						))}
				</SearchResultList>
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

const SearchResultsContainer = styled.div<{ isVisible: boolean }>`
	height: 135px;
	overflow-x: hidden;
	${({ isVisible }) => (isVisible ? 'display: block;' : 'display: none;')}
	padding: 0 8px;

	::-webkit-scrollbar {
		display: none;
	}
`;

const SearchResultList = styled.ul`
	padding: 0;
	margin: 0;
`;

export default SearchBar;
