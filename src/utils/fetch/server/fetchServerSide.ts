import { cookies } from 'next/headers';

export function fetchApi(url: string, init?: RequestInit): Promise<Response> {
  let formatUrl = url;

  if (url.startsWith('/')) {
    formatUrl = formatUrl.slice(1);
  }

  const options = {
    ...init,
    headers: { Cookie: cookies().toString() },
  };

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/${formatUrl}`, options);
}
