import { useState } from 'react';
import search from './lib/search';
import Links from './ui/links';
import './App.css';
import SearchedQuery from './ui/searched-query';

function App() {
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState<string>();
  const [links, setLinks] = useState([] as string[]);

  /*useEffect(() => {
    !!query && search(query).then((it) => setLinks(it));
  }, [query]);*/

  // https://www.carlrippon.com/using-lodash-debounce-with-react-and-ts/
  /*const debouncedSearch = debounce((query: string) => {
    !!query && search(query).then((it) => setLinks(it));
  }, 300);*/

  function onSearch() {
    setLinks([]);
    setQuery(query);
    setSearchedQuery(query);
    if (query.trim()) {
      search(query).then(setLinks);
    }
  }

  return (
    <>
      <div className="title">
        Caută o frază în
        <br />
        autorizatiile de construire și certificatele de urbanism
        <br />
        din Sector 5, București
      </div>
      <div className="details">
        (ordinea cuvintelor contează, corectitudinea lor mai puțin, e.g. o literă greșită sau lipsă este acceptabil)
      </div>

      <div className="search">
        <input
          className="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button className="search" onClick={onSearch}>
        Search
      </button>

      <SearchedQuery searchedQuery={searchedQuery} emptyResult={!links.length} />
      <Links links={links} />
    </>
  );
}

export default App;
