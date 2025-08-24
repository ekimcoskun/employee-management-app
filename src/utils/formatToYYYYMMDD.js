export function toYYYYMMDD(val) {
  if (!val) return "";
  const parts = val.split("-");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
