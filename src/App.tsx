import { useEffect, useRef, useState } from 'react';
import search from './lib/search';
import Links from './ui/links';
import './App.css';
import SearchedQuery from './ui/searched-query';
import { useLocation } from 'react-router-dom';
import SearchTitle from './ui/search-title';
import SearchType from './ui/SearchType';

function App() {
  const initialized = useRef(false);

  const queryParams = useLocation().search.slice(1);
  // console.log('queryParams:', queryParams);

  const [type, setType] = useState('SMALL');
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState<string>();
  const [links, setLinks] = useState([] as string[]);

  // console.log(`[init] type = ${type}, query = ${query}, searchedQuery = ${searchedQuery}`);

  const doSearch = (type: string, query?: string) => {
    // console.log(`[doSearch] (new) query = ${query}`);
    if (query?.trim()) {
      search(type, query).then(setLinks);
    }
  };

  function onSearch() {
    // console.log(`[onSearch] query = ${query}, searchedQuery = ${searchedQuery}`);
    setLinks([]);
    setSearchedQuery(query);
    if (query?.trim()) {
      doSearch(type, query);
    }
  }

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    const urlSearchParams = new URLSearchParams(queryParams);
    const newQuery = urlSearchParams.get('query') || '';
    // console.log(`[useEffect] type = ${type}, newQuery = ${newQuery}`);
    setQuery(newQuery);
    if (newQuery?.trim()) {
      setSearchedQuery(newQuery);
      doSearch(type, newQuery);
    }
  }, [queryParams, type]);

  return (
    <>
      <div className="title">
        Caută o frază în autorizațiile de construire și certificatele de urbanism din Sector 5, București
      </div>

      <div className="search">
        <input className="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <SearchType type={type} setType={setType} />
      <button className="search" onClick={onSearch}>
        Search
      </button>

      <SearchedQuery searchedQuery={searchedQuery} count={links.length} />
      <Links links={links} />
    </>
  );
}

export default App;
