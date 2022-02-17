import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SearchResultObj } from './App';

interface Props {
	item: SearchResultObj;
	isHighlighted: boolean;
}

const SearchResultItem = ({ item, isHighlighted }: Props) => {
	return (
		<ResultItem
			isHighlighted={isHighlighted}
			item={item}
			tabIndex={0}
			key={item.id}
			data-name={item.name}
		>
			<ResultAvatar data-name={item.name}></ResultAvatar>
			<ResultDetails>
				<p data-name={item.name}>{item.name}</p>
				<p data-name={item.name}>{item.email}</p>
			</ResultDetails>
		</ResultItem>
	);
};

const ResultItem = styled.li<Props>`
	display: flex;
	align-items: center;
	padding: 12px 12px 12px 0;
	cursor: pointer;
	:hover {
		background-color: antiquewhite;
	}

	${({ isHighlighted }) => isHighlighted && 'background-color: antiquewhite;'}
`;

const ResultDetails = styled.div`
	display: flex;
	flex-direction: column;

	p {
		margin: 0;
		margin-left: 8px;
		padding: 0;
	}
`;

const ResultAvatar = styled.div`
	width: 40px;
	height: 40px;
	background-color: aliceblue;
`;

export default SearchResultItem;
