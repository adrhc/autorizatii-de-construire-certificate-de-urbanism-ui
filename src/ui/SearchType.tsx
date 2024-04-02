import { Box, useMediaQuery } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useTheme } from '@mui/material/styles';

export type SearchTypeParam = {
  type: string;
  setType: (type: string) => void;
};

export default function SearchType({ type, setType }: SearchTypeParam) {
  const theme = useTheme();
  const size = useMediaQuery(theme.breakpoints.down('sm')) ? 'medium' : 'small';

  // console.log(`[SearchType] type = ${type}, size = ${size}`);
  return (
    <>
      <RadioGroup defaultValue="SMALL" name="type" sx={{ mt: 1, mb: 1 }}>
        <FormControlLabel
          value="EXACT"
          control={<Radio size={size} checked={type === 'EXACT'} onChange={(e) => setType(e.target.value)} />}
          label="căutare exactă (i.e. cuvintele vor fi căutate așa cum s-au scris)"
        />
        <FormControlLabel
          value="SMALL"
          control={<Radio size={size} checked={type === 'SMALL'} onChange={(e) => setType(e.target.value)} />}
          label="toleranță moderată la greșeli (i.e. maxim un caracter greșit per cuvânt)"
        />
        <FormControlLabel
          value="BIG"
          control={<Radio size={size} checked={type === 'BIG'} onChange={(e) => setType(e.target.value)} />}
          label="toleranță maximă la greșeli (i.e. maxim două caractere greșite per cuvânt)"
        />
      </RadioGroup>
      <Box sx={{ fontSize: 'small', mt: 1, mb: 1 }}>
        Grupurile de două litere sunt căutate exact, i.e. nu se tolerează greșelile!
        <br />
        Pentru oricare dintre opțiuni ordinea cuvintelor contează dar diacriticele și mărimea literelor nu!
      </Box>
    </>
  );
}
