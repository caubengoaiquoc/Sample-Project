import { combineReducers } from "redux";
import { saveIoReducer, saveTotalUserReducer, getUserListSuccessfulReducer, combineMsgReducer, getAllChatSuccessfulReducer, getPrivateChatSuccessfulReducer } from "./reducer";

const rootReducers = combineReducers({
    saveIoReducer,
    saveTotalUserReducer,
    getUserListSuccessfulReducer,
    combineMsgReducer,
    getAllChatSuccessfulReducer,
    getPrivateChatSuccessfulReducer
});

export default rootReducers;