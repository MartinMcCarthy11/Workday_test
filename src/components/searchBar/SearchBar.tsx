import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import styled from 'styled-components';
import SearchResultItem from './SearchResultItem';
import ManagersContext, { ValueContext } from '../../context/ManagersContext';
import { SearchResultObj } from '../../helpers/HandleApiData';
import SearchInput from './SearchInput';

function SearchBar() {
	const [typedChar, setTypedChar] = useState('');
	const [filteredResult, setFilteredResult] = useState<SearchResultObj[]>([]);
	const [focusIndex, setFocusIndex] = useState(-1);
	const [isVisible, setVisibility] = useState(false);
	const { searchData }: ValueContext = useContext(ManagersContext);
	const searchResultContainerRef = useRef<HTMLUListElement>(null);

	function setSearchPhrase(phrase: string) {
		if (phrase != null) {
			setTypedChar(phrase);
		}
	}

	function scrollIntoView(position: number) {
		if (searchResultContainerRef) {
			const parentElement = searchResultContainerRef.current!
				.parentElement as HTMLUListElement;

			parentElement.scrollTo({
				top: position - 102,
				behavior: 'smooth',
			});
		}
	}

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
		result = searchData.filter(({ searchName }) => {
			return searchName.includes(searchTerm.toLowerCase());
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
		setSearchPhrase(searchTerm);
		const result = filter(searchData!, searchTerm);

		if (searchTerm === '' || filteredResult.length === 0) {
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
		if (value !== '' && filteredResult.length === 0) {
			hideSearchResults();
		} else if (value.length > 0) {
			const searchTerm = value;
			const result = filter(searchData!, searchTerm);
			setFocusIndex(-1);
			scrollIntoView(0);
			setFilteredResult(result);
			showSearchResults();
		}

		if (value === '') {
			setFilteredResult(searchData!);
			showSearchResults();
		}
	}

	function handleResultItemClick(e: React.MouseEvent<HTMLDivElement>) {
		const value = e.target as HTMLDivElement;
		setSearchPhrase(value.getAttribute('data-name')!);
		hideSearchResults();
	}

	function handleBlur(e: React.FocusEvent) {
		e.persist();
		if (
			e.relatedTarget &&
			e.relatedTarget!.getAttribute('data-name')! !== ''
		) {
			setSearchPhrase(e.relatedTarget!.getAttribute('data-name')!);
			return;
		} else {
			hideSearchResults();
		}
	}

	function handleKeyBoardNavigation(e: React.KeyboardEvent) {
		const value = (e.target as HTMLInputElement).value;
		switch (e.key) {
			case 'Enter':
				if (value === '') {
					setFilteredResult(searchData!);
					showSearchResults();
				}
				if (focusIndex !== -1) {
					setSearchPhrase(filteredResult[focusIndex].name);
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

	function handleSearchItemKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Enter') {
			const value = (e.target as HTMLDivElement).getAttribute(
				'data-name'
			);
			setSearchPhrase(value as string);
			hideSearchResults();
		}
	}

	return (
		<SearchWrapper data-testid='search-bar-test-id'>
			<SearchInput
				value={typedChar ? typedChar : ''}
				onChange={handleChange}
				onClick={handleClick}
				onBlur={handleBlur}
				onKeyDown={handleKeyBoardNavigation}
				isVisible={isVisible}
			/>
			<SearchResultsContainer
				onClick={handleResultItemClick}
				isVisible={isVisible}
				data-testid='search-results-container-testid'
			>
				<SearchResultList
					ref={searchResultContainerRef}
					data-testid='search-results-ul-testid'
				>
					{filteredResult.length !== 0 &&
						filteredResult.map((item, index) => (
							<SearchResultItem
								item={item}
								key={item.id}
								isHighlighted={
									focusIndex === index ? true : false
								}
								onKeyDown={handleSearchItemKeyPress}
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

const SearchResultsContainer = styled.div<{ isVisible: boolean }>`
	max-height: 137px;
	overflow-x: hidden;
	${({ isVisible }) => (isVisible ? 'display: block;' : 'display: none;')}
	border: 1px solid #c2c2c2;
	border-radius: 5px;
	box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.04);
	::-webkit-scrollbar {
		display: none;
	}
`;

const SearchResultList = styled.ul`
	padding: 0;
	margin: 0;
`;

export default SearchBar;
