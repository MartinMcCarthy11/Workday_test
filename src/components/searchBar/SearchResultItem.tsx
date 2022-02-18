import React from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { SearchResultObj } from '../App';

interface Props {
	item: SearchResultObj;
	isHighlighted: boolean;
}

const SearchResultItem = ({ item, isHighlighted }: Props) => {
	function getInitials(name: string) {
		let initials = name.split(' ').map((str) => str[0]);
		// console.log(initials);
		return initials;
	}

	return (
		<ResultItem
			isHighlighted={isHighlighted}
			item={item}
			tabIndex={0}
			key={item.id}
			data-name={item.name}
		>
			<ResultAvatar data-name={item.name}>
				{getInitials(item.name)}
			</ResultAvatar>
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
	color: black;
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	background-color: aliceblue;
`;

export default SearchResultItem;
