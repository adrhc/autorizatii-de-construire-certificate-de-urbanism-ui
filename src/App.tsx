import { useEffect, useRef, useState } from 'react';
import search from './lib/search';
import Links from './ui/links';
import './App.css';
import SearchedQuery from './ui/searched-query';
import { useLocation } from 'react-router-dom';
import SearchTitle from './ui/search-title';

function App() {
  const initialized = useRef<string>();

  const queryParams = useLocation().search.slice(1);
  // console.log('queryParams:', queryParams);

  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState<string>();
  const [links, setLinks] = useState([] as string[]);

  const doSearch = (query?: string) => {
    // console.log(`[doSearch] (new) query = ${query}`);
    if (query?.trim()) {
      search(query).then(setLinks);
    }
  };

  function onSearch() {
    // console.log(`[onSearch] searchedQuery = ${searchedQuery}, query = ${query}`);
    setLinks([]);
    setSearchedQuery(query);
    if (query?.trim()) {
      doSearch(query);
    }
  }

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = queryParams;
    const urlSearchParams = new URLSearchParams(queryParams);
    const newQuery = urlSearchParams.get('query') || '';
    // console.log(`[useEffect] newQuery = ${newQuery}, query = ${query}, searchedQuery = ${searchedQuery}`);
    setQuery(newQuery);
    if (newQuery?.trim()) {
      setSearchedQuery(newQuery);
      doSearch(newQuery);
    }
  }, [queryParams]);

  return (
    <>
      <SearchTitle />

      <div className="search">
        <input className="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
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
