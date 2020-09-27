const encode = key => window.btoa(key)
const decode = encodedKey => window.atob(encodedKey)

export const saveToLocal = (key, value) => localStorage.setItem(encode(key), encode(JSON.stringify(value)))
export const getFromLocal = (key) => JSON.parse(decode(localStorage.getItem(encode(key))))
export const removeFromLocal = (key) => localStorage.removeItem(encode(key))


