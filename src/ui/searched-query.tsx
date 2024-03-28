import './searched-query.css';

type SearchedQueryParam = {
  searchedQuery: string | undefined;
  emptyResult: boolean;
};

export default function SearchedQuery({ searchedQuery, emptyResult }: SearchedQueryParam) {
  if (searchedQuery === undefined) {
    return <></>;
  } else if (!searchedQuery.trim()) {
    return (
      <div className="searched">Căutarea după "{searchedQuery.replace(/ /g, '\u00A0')}" nu este permisă!</div>
    );
  } else if (emptyResult) {
    return (
      <div className="searched">Nu s-a găsit nimic pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</div>
    );
  } else {
    return (
      <div className="searched">S-au găsit următoarele pentru "{searchedQuery.replace(/ /g, '\u00A0')}"</div>
    );
  }
}
