import { put, takeLatest, select, all, takeEvery } from 'redux-saga/effects';
import { saveTotalUser, getUserListSuccessful, getAllChatSuccessful, getAllChat, getTotalUser, getPrivateChatSuccessful, getPrivateChat } from '../action';
import { getTotalUserService, getMessage, getPrivateMessage } from '../../services/chatServices';


function* watchGetTotalUserWorker() {
    try {
        const state = yield select();
        if (state.saveIoReducer && state.saveIoReducer.io) {
            const data = yield getTotalUserService(state.saveIoReducer.io);
            if (data && data.totalUser && data.userList) {
                let userList = data.userList;
                delete userList[state.saveIoReducer.io.id]
                yield all([put(saveTotalUser(data.totalUser)) , put(getUserListSuccessful(userList))]) 
            }
        }
    } catch (error) {
        console.log(error);

    }
}

function* watchGetAllChatWorker() {
    try {
        const state = yield select();
        if (state.saveIoReducer && state.saveIoReducer.io) {
            const data = yield getMessage(state.saveIoReducer.io);
            if (data) {
                yield put(getAllChatSuccessful(data))
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function* watchGetPrivateChatWorker() {
    try {
        const state = yield select();
        if (state.saveIoReducer && state.saveIoReducer.io) {
            const data = yield getPrivateMessage(state.saveIoReducer.io);
            if (data) {
                yield put(getPrivateChatSuccessful(data))
            }
        }
    } catch (error) {
        console.log(error);
    }
}






export function* chatSaga() {
    yield takeLatest(getTotalUser, watchGetTotalUserWorker);
    yield takeLatest(getAllChat, watchGetAllChatWorker);
    yield takeLatest(getPrivateChat, watchGetPrivateChatWorker);
}