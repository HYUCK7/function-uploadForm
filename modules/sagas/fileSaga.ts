import { AxiosResponse } from "axios";
import { call, takeEvery } from "redux-saga/effects";
import { uploadApi } from "../api";
import { fileAction } from "../reducers/fileSlice";

function* upload (action : any) {
    const param = action.payload
    try{
        console.log(`사가진입 ${typeof(param)}`)
        yield call(uploadApi, param)
    } catch (error){
        null
    }
}

export function* watchUpload(){
    const {fileUpload} = fileAction
    yield takeEvery(fileUpload, upload)
}