export default async function search(query: string): Promise<string[]> {
  //   return ['link1', 'link2', 'link3'];
  const params = new URLSearchParams({ query });
  console.log(`/api/search?${params}`);
  return await fetch(`/api/search?${params}`)
    .then((res) => {
        console.log('res:', res);
        return res.json();
    })
    .catch((e) => [e.toString()]);
}
