import SearchBar from './searchBar/SearchBar';
import { ManagersProvider } from '../context/ManagersContext';

function App() {
	return (
		<ManagersProvider>
			<SearchBar />
		</ManagersProvider>
	);
}

export default App;
