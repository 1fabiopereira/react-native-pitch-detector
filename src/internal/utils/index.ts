/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any) {
  return Boolean(
    item &&
      typeof item === 'object' &&
      !Array.isArray(item) &&
      !(item instanceof Date)
  );
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function merge<T>(target: any, ...sources: any): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return merge(target, ...sources) as T;
}
