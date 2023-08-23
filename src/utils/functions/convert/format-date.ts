// ex : '2023-07-15T21:18:07.000Z'
export function formatDateToCustomFormat(isoDate: string) {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate;
}
// ex output: 15/07/2023 21:18
