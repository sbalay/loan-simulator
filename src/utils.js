export function mapObject(obj, mapFn) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, mapFn(value)]));
}
