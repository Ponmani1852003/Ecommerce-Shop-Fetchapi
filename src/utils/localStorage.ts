export function getFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback; // local storage only store the sting value so date are convert sting after that store the local storage
  } catch {
    return fallback; //no data , no error , get the default value 
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}