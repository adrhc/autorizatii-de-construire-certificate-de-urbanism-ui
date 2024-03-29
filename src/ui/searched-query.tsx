import './searched-query.css';

type SearchedQueryParam = {
  searchedQuery: string | undefined;
  count: number;
};

export default function SearchedQuery({ searchedQuery, count }: SearchedQueryParam) {
  if (searchedQuery === undefined) {
    return <></>;
  } else if (!searchedQuery.trim()) {
    return (
      <div className="searched">Căutarea după "{searchedQuery.replace(/ /g, '\u00A0')}" nu este permisă!</div>
    );
  } else if (count == 1) {
    return (
      <div className="searched">S-a găsit {count} rezultat pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</div>
    );
  } else if (count > 1) {
    return (
      <div className="searched">S-au găsit {count} rezultate pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</div>
    );
  } else {
    return (
      <div className="searched">Nu s-a găsit nimic pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</div>
    );
  }
}
