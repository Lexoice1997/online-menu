import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Categories from './components/Categories/Categories';
import Foods from './components/Foods/Foods';
import Search from './components/Search/Search';

function App() {
  return (
    <div className="app">
      <h2>Good Evening</h2>
      <Search />
      <Categories />
      <Foods />
    </div>
  );
}

export default App;
