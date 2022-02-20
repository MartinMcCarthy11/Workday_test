import { render, screen, cleanup } from '@testing-library/react';
import SearchInput from './SearchInput';

afterEach(cleanup);

const testId = 'search-input-testid';
const mockFn = jest.fn();

test('Renders SearchResult Base', () => {
	render(
		<SearchInput
			value='Test'
			onChange={mockFn}
			onClick={mockFn}
			onBlur={mockFn}
			onKeyDown={mockFn}
			isVisible={false}
		/>
	);
	expect(screen.getByTestId(testId)).toBeTruthy();
});

test('Renders SearchResult Test input', () => {
	render(
		<SearchInput
			value='Test'
			onChange={mockFn}
			onClick={mockFn}
			onBlur={mockFn}
			onKeyDown={mockFn}
			isVisible={false}
		/>
	);
	expect((screen.getByTestId(testId) as HTMLInputElement).value).toBe('Test');
});
