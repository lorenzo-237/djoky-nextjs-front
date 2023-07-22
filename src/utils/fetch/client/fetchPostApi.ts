import { fetchApi } from './fetchClientSide';

export function fetchPostApi(url: string, dto?: any): Promise<Response> {
  return fetchApi(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });
}
