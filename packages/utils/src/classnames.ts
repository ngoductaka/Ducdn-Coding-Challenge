/**
 * Combine multiple class names into a single string
 * Filters out falsy values
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Create a namespaced class name
 */
export function createClassName(namespace: string, name: string): string {
  return `${namespace}-${name}`;
}
