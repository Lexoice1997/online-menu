import Categories from '../components/Categories/Categories';
import Foods from '../components/Foods/Foods';
import Search from '../components/Search/Search';

function Home() {
  return (
    <>
      <h2>Good Evening</h2>
      <Search />
      <Categories />
      <Foods />
    </>
  );
}

export default Home;
