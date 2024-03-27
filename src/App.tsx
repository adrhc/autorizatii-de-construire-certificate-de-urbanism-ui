import { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');

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
      <button className="search" onClick={() => alert(query)}>
        Search
      </button>
    </>
  );
}

export default App;
