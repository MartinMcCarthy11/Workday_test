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

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log('Test');
		const searchTerm = e.target.value;
		setTypedChar(searchTerm);

		const filter = searchData.filter((value) => {
			return value.name.toLowerCase().includes(searchTerm.toLowerCase());
		});

		if (searchTerm === '') {
			setFilteredResult([]);
		} else {
			setFilteredResult(filter);
		}
	}

	function showFullSearchData() {
		setFilteredResult(searchData);
	}

	return (
		<SearchWrapper>
			<SearchInput
				type='text'
				id='searchBarId'
				value={typedChar}
				onChange={handleChange}
				onClick={showFullSearchData}
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
