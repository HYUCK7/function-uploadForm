import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface uploadState  {
    data: [],
    status : 'idle' | 'success' | 'fail'
}

const initialState : uploadState  = {
    data: [],
    status: 'idle'
}

export const fileSlice = createSlice({
    name: 'fileSlice',
    initialState,
    reducers: {
        fileUpload:(state, action : PayloadAction<FormData | undefined>) =>{
            console.log(`>>Reducer 확인 ${action.payload}`)
        }
    }
})

export const {fileUpload} = fileSlice.actions
const {reducer, actions} = fileSlice
export const fileAction = actions
export default reducer