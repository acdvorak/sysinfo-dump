export function toLocalIsoStringSafe(d: Date): string {
  const pad = (n: number, w = 2): `${number}` => {
    return String(n).padStart(w, '0') as `${number}`;
  };

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hour = pad(d.getHours());
  const minute = pad(d.getMinutes());
  const second = pad(d.getSeconds());

  return `${year}${month}${day}_${hour}${minute}${second}`;
}
