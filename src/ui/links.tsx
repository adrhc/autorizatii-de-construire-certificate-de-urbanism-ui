import './links.css';

export type LinksParams = {
  query: string | undefined;
  links: string[];
};

export default function Links({ query, links }: LinksParams) {
  if (query === undefined) {
    return <></>;
  } else if (!links) {
    return <div className="searched">Found nothing for "{query}"</div>;
  } else {
    return (
      <>
        <div className="searched">Found for "{query}"</div>
        <div className="links">
          {links.map((l) => (
            <a href={l}>{l}</a>
          ))}
        </div>
      </>
    );
  }
}
