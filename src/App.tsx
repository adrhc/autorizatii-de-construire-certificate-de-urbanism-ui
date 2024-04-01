import { useEffect, useRef, useState } from 'react';
import search from './lib/search';
import Links from './ui/links';
import SearchedQuery from './ui/searched-query';
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
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const btnSize = isSmUp && isMdDown ? 'medium' : !isSmUp ? 'large' : 'small';
  // console.log(`isSmUp = ${isSmUp}, isMdDown = ${isMdDown}, btnSize = ${btnSize}`);

  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6">
          Caută o frază în autorizațiile de construire și certificatele de urbanism din Sector 5, București
        </Typography>
      </Box>

      <TextField
        fullWidth
        id="query"
        label="Fraza de căutare"
        type="search"
        variant="outlined"
        margin="normal"
        size={isSmUp ? 'small' : 'medium'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SearchType type={type} setType={setType} />

      <Stack sx={{ flexDirection: ['column', 'row'], mt: 1, mb: 1, justifyContent: 'center' }}>
        <Button variant="outlined" onClick={onSearch} size={btnSize}>
          Caută
        </Button>
      </Stack>

      <SearchedQuery searchedQuery={searchedQuery} count={links.length} />
      <Links links={links} />
    </>
  );
}

export default App;
