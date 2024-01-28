import {create} from 'zustand'
import {mountStoreDevtool} from 'simple-zustand-devtools'

const useAuthStore = create((set,get) => ({
    //initial userData and loading states
    userData:null,
    loading:false,

    //used to retrieve user details
    user: () => ({
        user_id: get().userData?.user_id || null,
        username: get().userData?.username || null,
    }),
    
    //for updating user state
    setUser: (user) => set({userData : user}),
    //for updating loading state
    setLoading: (loading) => set({loading}),
    
    //for updating logged in state
    isLoggedIn: ()=>get().userData !==null,
}))
//if in dev mode mount the dev tools
if(import.meta.env.DEV){
    mountStoreDevtool('Store' , useAuthStore)
}

export {useAuthStore}
