import { all, fork } from 'redux-saga/effects';
import { watchUpload } from './fileSaga';
export default function* rootSaga () {
    yield all([
        fork(watchUpload)
    ])
}