import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchResultItem } from './App';

interface Props {
	searchData: SearchResultItem[];
}

function SearchBar({ searchData }: Props) {
	const [typedChar, setTypedChar] = useState('');
	const [filteredResult, setFilteredResult] = useState<SearchResultItem[]>(
		[]
	);

	const filter = (searchData: SearchResultItem[], searchTerm: string) => {
		const result = searchData.filter(({ name }) => {
			return name
				.replace(/\s/g, '')
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
		});
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

	function handleBlur() {
		setFilteredResult([]);
	}

	return (
		<SearchWrapper>
			<SearchInput
				type='text'
				id='searchBarId'
				value={typedChar}
				onChange={handleChange}
				onClick={handleClick}
				onBlur={handleBlur}
			></SearchInput>
			<SearchResultsContainer>
				{filteredResult.length !== 0 &&
					filteredResult.map((item) => (
						<ResultItem key={item.id}>
							<ResultAvatar></ResultAvatar>
							<ResultDetails>
								<p>{item.name}</p>
								<p>{item.email}</p>
							</ResultDetails>
						</ResultItem>
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
	padding: 0px 8px;

	::-webkit-scrollbar {
		display: none;
	}
`;

const ResultItem = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px 12px 12px 0;
`;

const ResultDetails = styled.div`
	display: flex;
	flex-direction: column;

	p {
		margin: 0;
		padding: 0;
	}
`;

const ResultAvatar = styled.div`
	width: 40px;
	height: 40px;
	background-color: aliceblue;
`;

export default SearchBar;
