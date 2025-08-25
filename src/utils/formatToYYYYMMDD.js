export function toYYYYMMDD(val) {
  if (!val) return "";
  const parts = val.split("-");
  if (parts.length !== 3) return val;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
