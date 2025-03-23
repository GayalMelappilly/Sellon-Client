'use server'

const apiUrl = process.env.API_URL

export const getAllCategories = async () => {
    try{
        const res = await fetch(`${apiUrl}/get-categories`)
        if(!res.ok){
            throw new Error('Failed to fetch categories')
        }
        return res.json()
    }catch(err: any){
        throw new Error('Failed to fetch categories', err)
    }
}


// export const getCurrentUser = async (accessToken: string) => {

//     console.log(`${apiUrl}/get-current-user`)
//     const res = await fetch(`${apiUrl}/get-current-user`, {
//         method: 'GET',
//         credentials: "include", 
//         headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`
//     }
//     })
//     if (!res.ok) {
//         throw new Error('Failed to fetch current user')
//     }
//     return res.json()
// }