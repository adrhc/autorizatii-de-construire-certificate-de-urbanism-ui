import { Link, Stack, useMediaQuery, useTheme } from '@mui/material';

export type LinksParam = {
  links: string[] | undefined;
};

export default function Links({ links }: LinksParam) {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Stack sx={{ mt: 1 }}>
      {!!links &&
        links.map((l) => (
          <Link key={l} href={l} sx={{ wordBreak: 'break-word', fontSize: isSmDown ? 'inherit' : 'small' }}>
            {l}
          </Link>
        ))}
    </Stack>
  );
}
