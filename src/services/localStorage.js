const encode = key => window.btoa(key)
const decode = encodedKey => window.atob(encodedKey)

export const saveToLocal = (key, value) => localStorage.setItem(encode(key), encode(JSON.stringify(value)))
export const getFromLocal = (key) => {
  const encodedValue = localStorage.getItem(encode(key));
  const decodedValue = encodedValue && decode(encodedValue);
  return decodedValue && JSON.parse(decodedValue);
}
export const removeFromLocal = (key) => localStorage.removeItem(encode(key))


