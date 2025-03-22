export const getLocalStorage = (key: string) => {
    console.log("REACHED")
    if(typeof window !== 'undefined'){
        const token = localStorage.getItem(key)
        console.log("TOKEN " ,token)
        return token
    }
}

export const setLocalStorage = (key: string, value: string) => {
    if(typeof window !== 'undefined'){
        localStorage.setItem(key, value)
    }
}