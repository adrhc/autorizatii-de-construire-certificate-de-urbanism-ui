import './SearchType.css';

export type SearchTypeParam = {
    type: string,
    setType: (type: string) => void
}

export default function SearchType({type, setType}: SearchTypeParam) {
  return (
    <div className="search-type">
      <input
        type="radio"
        name="type"
        value="EXACT"
        onChange={(e) => setType(e.target.value)}
        defaultChecked={type === 'EXACT'}
      />
      <label htmlFor="EXACT">căutare exactă (i.e. cuvintele vor fi căutate așa cum s-au scris)</label>
      <br />
      <input
        type="radio"
        name="type"
        value="SMALL"
        onChange={(e) => setType(e.target.value)}
        defaultChecked={type === 'SMALL'}
      />
      <label htmlFor="SMALL">toleranță minimă la greșeli (i.e. maxim un caracter greșit per cuvânt)</label>
      <br />
      <input
        type="radio"
        name="type"
        value="BIG"
        onChange={(e) => setType(e.target.value)}
        defaultChecked={type === 'BIG'}
      />
      <label htmlFor="BIG">toleranță maximă la greșeli (i.e. maxim două caractere greșite per cuvânt)</label>
      <br />
      <div className="search-rule">
        Pentru oricare dintre opțiuni ordinea cuvintelor contează dar diacriticele și mărimea literelor nu!
      </div>
    </div>
  );
}
