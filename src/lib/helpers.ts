// This is because if we do local storage of a item which doesn't exist, it returns undefined
// so it breaks the JSON.parse method (you can't JSON.parse(undefined)), so if that happens,
// we just return an empty object
export const safelyGetObject = (key: string) => JSON.parse(localStorage.getItem(key) || '{}');
