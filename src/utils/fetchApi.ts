export default function fetchApi(url: string, init?: RequestInit): Promise<Response> {
  let formatUrl = url;

  if (url.startsWith('/')) {
    formatUrl = formatUrl.slice(1);
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${formatUrl}`, init);
}
