import styled from 'styled-components';
import { SearchResultObj } from '../../helpers/HandleApiData';

interface Props extends StyleProps {
	item: SearchResultObj;
}

interface StyleProps {
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
			<ResultAvatar data-name={item.name} isHighlighted={isHighlighted}>
				{getInitials(item.name)}
			</ResultAvatar>
			<ResultDetails isHighlighted={isHighlighted}>
				<p data-name={item.name}>{item.name}</p>
				<p data-name={item.name}>{item.email}</p>
			</ResultDetails>
		</ResultItem>
	);
};

const ResultItem = styled.li<Props>`
	display: flex;
	align-items: center;
	padding: 12px 12px 12px 12px;
	color: black;
	cursor: pointer;
	:hover {
		background-color: #d1fcee;
	}
	border-top: 1px solid rgba(0, 0, 0, 0.2);
	${({ isHighlighted }) => isHighlighted && 'background-color:  #d1fcee;'}
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

export default SearchResultItem;
