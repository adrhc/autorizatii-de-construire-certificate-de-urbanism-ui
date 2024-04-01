import { Link, Stack } from '@mui/material';

export type LinksParam = {
  links: string[] | undefined;
};

export default function Links({ links }: LinksParam) {
  return (
    <Stack sx={{ mt: 1 }}>
      {!!links &&
        links.map((l) => (
          <Link key={l} href={l} sx={{ wordBreak: 'break-word' }}>
            {l}
          </Link>
        ))}
    </Stack>
  );
}
