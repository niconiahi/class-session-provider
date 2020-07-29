export const safelyGetObject = (key: string) => JSON.parse(localStorage.getItem(key) || '{}');
