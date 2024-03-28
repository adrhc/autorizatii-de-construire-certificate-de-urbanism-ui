import './links.css';

export type LinksParam = {
  links: string[] | undefined;
};

export default function Links({ links }: LinksParam) {
  return (
    <div className="links">
      {!!links && links.map((l) => <a key={l} href={l}>{l}</a>)}
    </div>
  );
}
