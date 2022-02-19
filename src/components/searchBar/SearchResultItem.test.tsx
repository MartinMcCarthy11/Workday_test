import { render, screen, cleanup } from '@testing-library/react';
import { SearchResultObj } from '../../helpers/HandleApiData';
import SearchResultItem from './SearchResultItem';

afterEach(cleanup);

const testId = 'search-result-testid';

const testSearchResultObj: SearchResultObj = {
	id: '1',
	avatar: null,
	name: 'Frank Dunne',
	searchName: 'frankdunne',
	level: 'Manager',
	email: 'frank.dunne@test.ie',
};

test('Renders SearchResult Base', () => {
	render(
		<SearchResultItem item={testSearchResultObj} isHighlighted={false} />
	);
	expect(screen.getByTestId(testId)).toBeTruthy();
});

test('Renders SearchResult Highlighted', () => {
	render(
		<SearchResultItem item={testSearchResultObj} isHighlighted={true} />
	);
	expect(screen.getByTestId(testId)).toBeTruthy();
	expect(screen.getByTestId(testId)).toHaveStyle(
		'background-color:  #d1fcee;'
	);
});
// test('Renders SwitchToggle Disabled', () => {
// 	const { toggle, name, onChange } = testData;
// 	render(<SwitchToggle toggled={toggle} name={name} onChange={onChange} />);
// 	const input = screen.getByTestId('input-test-id');
// 	expect(input).toBeChecked();
// });
