import './SearchType.css';

export type SearchTypeParam = {
  type: string;
  setType: (type: string) => void;
};

export default function SearchType({ type, setType }: SearchTypeParam) {
  // console.log(`[SearchType] type = ${type}`);
  return (
    <div className="search-type">
      <input
        id="EXACT"
        type="radio"
        name="type"
        value="EXACT"
        onChange={(e) => setType(e.target.value)}
        checked={type === 'EXACT'}
      />
      <label htmlFor="EXACT">căutare exactă (i.e. cuvintele vor fi căutate așa cum s-au scris)</label>
      <br />
      <input
        id="SMALL"
        type="radio"
        name="type"
        value="SMALL"
        onChange={(e) => setType(e.target.value)}
        checked={type === 'SMALL'}
      />
      <label htmlFor="SMALL">toleranță minimă la greșeli (i.e. maxim un caracter greșit per cuvânt)</label>
      <br />
      <input
        id="BIG"
        type="radio"
        name="type"
        value="BIG"
        onChange={(e) => setType(e.target.value)}
        checked={type === 'BIG'}
      />
      <label htmlFor="BIG">toleranță maximă la greșeli (i.e. maxim două caractere greșite per cuvânt)</label>
      <br />
      <div className="search-rule">
        Grupurile de două litere sunt căutate exact (i.e. nu se tolerează greșelile) indiferent de alegere!
        <br />
        Pentru oricare dintre opțiuni ordinea cuvintelor contează dar diacriticele și mărimea literelor nu!
      </div>
    </div>
  );
}
