export function writeToLocalStorage<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readFromLocalStorage<T>(key: string): T | null {
  const valueJsonString = window.localStorage.getItem(key);
  return valueJsonString ? JSON.parse(valueJsonString) : null;
}