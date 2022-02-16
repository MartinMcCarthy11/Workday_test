import React from 'react';
import styled from 'styled-components';
import { SearchResultObj } from './App';

interface Props {
	item: SearchResultObj;
	index: number;
	focusIndex: number;
}

function SearchResultItem({ item, index, focusIndex }: Props) {
	return (
		<ResultItem
			focusIndex={focusIndex}
			index={index}
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
}

const ResultItem = styled.div<Props>`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 12px 12px 12px 0;
	cursor: pointer;
	:hover {
		background-color: antiquewhite;
	}

	${({ focusIndex, index }) =>
		focusIndex === index && 'background-color: antiquewhite;'}
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

export default SearchResultItem;
