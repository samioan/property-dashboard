export function setMinDate() {
  return new Date(new Date().getTime() + 86400000).toISOString().split("T")[0];
}
