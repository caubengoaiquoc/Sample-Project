
import { all } from "redux-saga/effects";
import { chatSaga } from "./chatSaga";


export function* rootSaga() {
    yield all([
        chatSaga()
    ]);
}