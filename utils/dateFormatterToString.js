export function dateFormatterToString(data) {
  const day = String(data.getDate()).padStart(2, '0');
  const month = String(data.getMonth() + 1).padStart(2, '0'); // Mês é base 0
  const year = data.getFullYear();
  const hour = String(data.getHours()).padStart(2, '0');
  const minute = String(data.getMinutes()).padStart(2, '0');

  return `${month}/${day}/${year}, ${hour}:${minute}`;
}
