const API_PATH = '/autorizatii-de-construire-certificate-de-urbanism/api';

export default async function search(query: string): Promise<string[]> {
  //   return ['link1', 'link2', 'link3'];
  const params = new URLSearchParams({ query });
//   console.log(`${API_PATH}/search?${params}`);
  return await fetch(`${API_PATH}/search?${params}`)
    .then((res) => {
    //   console.log('res:', res);
      return res.json();
    })
    .catch((e) => [e.toString()]);
}
