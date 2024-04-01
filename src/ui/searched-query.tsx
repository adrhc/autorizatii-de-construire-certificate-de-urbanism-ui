import { Box } from "@mui/material";

type SearchedQueryParam = {
  searchedQuery: string | undefined;
  count: number;
};

export default function SearchedQuery({ searchedQuery, count }: SearchedQueryParam) {
  const styles = {textAlign: "center", fontWeight: "bold"};
  if (searchedQuery === undefined) {
    return <></>;
  } else if (!searchedQuery.trim()) {
    return (
      <Box sx={styles}>Căutarea după "{searchedQuery.replace(/ /g, '\u00A0')}" nu este permisă!</Box>
    );
  } else if (count == 1) {
    return (
      <Box sx={styles}>S-a găsit {count} rezultat pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</Box>
    );
  } else if (count > 1) {
    return (
      <Box sx={styles}>S-au găsit {count} rezultate pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</Box>
    );
  } else {
    return (
      <Box sx={styles}>Nu s-a găsit nimic pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</Box>
    );
  }
}
