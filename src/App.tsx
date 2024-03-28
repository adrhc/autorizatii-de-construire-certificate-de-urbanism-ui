import { useEffect, useState } from 'react';
import search from './lib/search';
import Links from './ui/links';
import './App.css';
import SearchedQuery from './ui/searched-query';
import { useLocation } from 'react-router-dom';

function App() {
  const queryParams = useLocation().search.slice(1);
  console.log('queryParams:', queryParams);
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState<string>();
  const [links, setLinks] = useState([] as string[]);

  function onSearch() {
    setLinks([]);
    setSearchedQuery(query);
  }

  useEffect(() => {
    if (searchedQuery?.trim()) {
      search(searchedQuery).then(setLinks);
    }
  }, [searchedQuery]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(queryParams);
    const newQuery = urlSearchParams.get('query') || '';
    // console.log('newQuery:', newQuery);
    setQuery(newQuery);
    !!newQuery && setSearchedQuery(newQuery);
  }, [queryParams, setSearchedQuery]);

  return (
    <>
      <div className="title">
        Caută o frază în
        <br />
        autorizațiile de construire și certificatele de urbanism
        <br />
        din Sector 5, București
      </div>
      <div className="details">
        (ordinea cuvintelor contează, corectitudinea lor mai puțin, e.g. o
        literă greșită sau lipsă este acceptabil)
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

      <SearchedQuery
        searchedQuery={searchedQuery}
        emptyResult={!links.length}
      />
      <Links links={links} />
    </>
  );
}

export default App;
