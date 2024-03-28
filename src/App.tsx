import { useCallback, useEffect, useState } from 'react';
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

  const doSearch = useCallback((newQuery? : string) => {
    console.log(`[doSearch] query = ${query}, newQuery = ${newQuery}`);
    if (query?.trim()) {
      search(query).then(setLinks);
    } else if (newQuery?.trim()) {
      search(newQuery).then(setLinks);
    }
  }, [query]);

  function onSearch() {
    console.log('[onSearch] query:', query);
    console.log('[onSearch] 1.searchedQuery:', searchedQuery);
    setLinks([]);
    setSearchedQuery(query);
    console.log('[onSearch] 2.searchedQuery:', searchedQuery);
    doSearch();
  }

  // useEffect(() => {
  //   console.log('[useEffect doSearch]');
  //   doSearch(searchedQuery);
  // }, [searchedQuery, doSearch]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(queryParams);
    const newQuery = urlSearchParams.get('query') || '';
      console.log(
      `[useEffect location] query = ${query}, newQuery = ${newQuery}, searchedQuery = ${searchedQuery}`
    );
    setQuery(newQuery);
    if (newQuery?.trim() && newQuery != searchedQuery) {
      setSearchedQuery(newQuery);
      doSearch(newQuery);
    }
  }, []);

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
