export const safelyGetObject = (key: string) => JSON.parse(localStorage.getItem(key) || '{}');
export const safelyGetBoolean = (key: string) => Boolean(localStorage.getItem(key)) || false;
