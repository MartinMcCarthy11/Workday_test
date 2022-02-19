import React, { useContext } from 'react';
import styled from 'styled-components';
import ManagersContext, { ValueContext } from '../../context/ManagersContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Props {
	value: string;
	onChange: React.ChangeEventHandler;
	onClick: React.MouseEventHandler;
	onBlur: React.FocusEventHandler;
	onKeyDown: React.KeyboardEventHandler;
	isVisible: boolean;
}

function SearchInput({
	value,
	onChange,
	onClick,
	onBlur,
	onKeyDown,
	isVisible,
}: Props) {
	const { isLoading }: ValueContext = useContext(ManagersContext);
	return (
		<InputContainer>
			<Input
				type='text'
				id='searchBarId'
				value={value}
				onChange={onChange}
				onClick={onClick}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				autoComplete='off'
				disabled={isLoading}
			/>
			{isVisible ? <FaChevronUp /> : <FaChevronDown />}
		</InputContainer>
	);
}

const InputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2px;
	padding-right: 8px;
	border: 1px solid black;
	border-radius: 5px;
	box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.04);
`;

const Input = styled.input`
	position: relative;
	padding: 12px 12px;
	border: 0;
	flex: 3 1 auto;
	&:focus {
		outline: none;
	}
`;

export default SearchInput;
