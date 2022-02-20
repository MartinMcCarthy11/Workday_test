import React from 'react';
import styled from 'styled-components';
import { SearchResultObj } from '../../api_helpers/HandleApiData';

interface Props extends StyleProps {
	item: SearchResultObj;
	onKeyDown: React.KeyboardEventHandler;
}

interface StyleProps {
	isHighlighted: boolean;
}

const SearchResultItem = React.memo(
	({ item, isHighlighted, onKeyDown }: Props) => {
		function getInitials(name: string) {
			return name.split(' ').map((str) => str[0]);
		}

		return (
			<ResultItem
				isHighlighted={isHighlighted}
				item={item}
				tabIndex={0}
				key={item.id}
				data-name={item.name}
				data-testid='search-result-testid'
				aria-label={item.name}
				onKeyDown={onKeyDown}
			>
				<ResultAvatar
					data-name={item.name}
					isHighlighted={isHighlighted}
				>
					{getInitials(item.name)}
				</ResultAvatar>
				<ResultDetails isHighlighted={isHighlighted}>
					<p data-name={item.name}>{item.name}</p>
					<p data-name={item.name}>{item.email}</p>
				</ResultDetails>
			</ResultItem>
		);
	}
);

const ResultAvatar = styled.div<StyleProps>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	color: white;

	${({ isHighlighted }) =>
		isHighlighted
			? 'background-color: #62b6d2;'
			: 'background-color: #fca25f;'}
`;

const ResultDetails = styled.div<StyleProps>`
	display: flex;
	flex-direction: column;

	p {
		margin: 0;
		margin-left: 8px;
		padding: 0;
	}

	p:first-child {
		${({ isHighlighted }) => isHighlighted && 'color: #fca25f;'}
	}
`;

const ResultItem = styled.li<Props>`
	display: flex;
	align-items: center;
	padding: 12px 12px 12px 12px;
	color: black;
	cursor: pointer;
	border-top: 1px solid rgba(0, 0, 0, 0.2);
	:hover {
		background-color: #d1fcee;
		${ResultAvatar} {
			background-color: #62b6d2;
		}

		${ResultDetails} {
			p:first-child {
				color: #fca25f;
			}
		}
	}

	:focus {
		background-color: #d1fcee;
		${ResultAvatar} {
			background-color: #62b6d2;
		}

		${ResultDetails} {
			p:first-child {
				color: #fca25f;
			}
		}
	}

	${({ isHighlighted }) => isHighlighted && 'background-color:  #d1fcee;'}
`;

export default SearchResultItem;
