export function findDeepMatch(json, key, value) {
  if (Array.isArray(json)) {
    for (const item of json) {
      const result = findDeepMatch(item, key, value);
      if (result) return result;
    }
  } else if (typeof json === "object" && json !== null) {
    if (json[key] === value) {
      return json;
    }
    for (const nestedKey in json) {
      const result = findDeepMatch(json[nestedKey], key, value);
      if (result) return result;
    }
  }
  return null;
}
