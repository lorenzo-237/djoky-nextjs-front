import { fetchApi } from './fetch-api';

export function fetchPatchApi(url: string, dto?: any): Promise<Response> {
  return fetchApi(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });
}
