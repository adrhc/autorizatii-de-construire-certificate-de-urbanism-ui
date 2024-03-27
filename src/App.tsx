import { useState } from 'react';
import search from './lib/search';
import Links, { LinksParams } from './ui/links';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [linksParams, setLinksParams] = useState({} as LinksParams);

  /*useEffect(() => {
    !!query && search(query).then((it) => setLinks(it));
  }, [query]);*/

  // https://www.carlrippon.com/using-lodash-debounce-with-react-and-ts/
  /*const debouncedSearch = debounce((query: string) => {
    !!query && search(query).then((it) => setLinks(it));
  }, 300);*/

  function onSearch() {
    setLinksParams({ query: '' } as LinksParams);
    !!query && search(query).then((links) => setLinksParams({ query, links }));
  }

  return (
    <>
      <div className="title">Caută o frază</div>
      <div className="details">
        (ordinea cuvintelor contează, corectitudinea lor mai puțin)
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
      <Links query={linksParams.query} links={linksParams.links} />
    </>
  );
}

export default App;
