import { Box } from "@mui/material";

type SearchedQueryParam = {
  searchedQuery: string | undefined;
  count: number;
};

export default function SearchedQuery({ searchedQuery, count }: SearchedQueryParam) {
  if (searchedQuery === undefined) {
    return <></>;
  } else if (!searchedQuery.trim()) {
    return (
      <Box textAlign="center">Căutarea după "{searchedQuery.replace(/ /g, '\u00A0')}" nu este permisă!</Box>
    );
  } else if (count == 1) {
    return (
      <Box textAlign="center">S-a găsit {count} rezultat pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</Box>
    );
  } else if (count > 1) {
    return (
      <Box textAlign="center">S-au găsit {count} rezultate pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</Box>
    );
  } else {
    return (
      <Box textAlign="center">Nu s-a găsit nimic pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</Box>
    );
  }
}
