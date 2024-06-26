import { useEffect, useRef, useState } from 'react';
import search from './lib/search';
import Links from './ui/Links';
import SearchedQuery from './ui/SearchedQuery';
import { useLocation } from 'react-router-dom';
import SearchType from './ui/SearchType';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import { Stack, Typography } from '@mui/material';

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
    const newType = urlSearchParams.get('type') || 'SMALL';
    const newQuery = urlSearchParams.get('query') || '';
    // console.log(`[useEffect] newType = ${newType}, newQuery = ${newQuery}`);
    setType(newType);
    setQuery(newQuery);
    if (newQuery?.trim()) {
      setSearchedQuery(newQuery);
      doSearch(newType, newQuery);
    }
  }, [queryParams]);

  // xs, sm, md, lg, xl
  const isSmUp = useMediaQuery(useTheme().breakpoints.up('sm'));
  // console.log(`isSmUp = ${isSmUp}, isMdDown = ${isMdDown}, btnSize = ${btnSize}`);

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6">
          Caută autorizații de construire și certificate de urbanism din Sector 5, București
        </Typography>
      </Box>

      <TextField
        fullWidth
        id="query"
        label="Cuvântul sau fraza de căutare"
        type="search"
        variant="outlined"
        margin="normal"
        size={isSmUp ? 'small' : 'medium'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SearchType type={type} setType={setType} />

      <Stack sx={{ flexDirection: ['column', 'row'], mt: 1, mb: 1, justifyContent: 'center' }}>
        <Button variant="outlined" onClick={onSearch} size="large">
          Caută
        </Button>
      </Stack>

      <SearchedQuery searchedQuery={searchedQuery} count={links.length} />
      <Links links={links} />
    </>
  );
}

export default App;
