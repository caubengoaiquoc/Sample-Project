import {SAVE_IO_REF , SAVE_TOTAL_USER, COMBINE_MESSAGE, GET_USER_LIST_SUCESSFUL, GET_ALL_CHAT_SUCESSFUL, GET_PRIVATE_CHAT_SUCESSFUL} from "../action/actions.js";

const defaultState= {};
const totalUser = {};
const defaultCombineMsg = [];
const defaultUserList = {}
const defaultMsgArr = []
const defaultPrivateMsgArr = []


export const  saveIoReducer = (state = defaultState , action) =>{
    if(action.type === SAVE_IO_REF) {
        return {io : action.io, userName: action.userName}
    }else{
        return state
    }
}


export const saveTotalUserReducer = (state = totalUser , action) => {
    if(action.type === SAVE_TOTAL_USER){
        return {totalUser: action.totalUser};
    }else {
        return state;
    }
}

export const getUserListSuccessfulReducer = (state = defaultUserList , action) => {
    if(action.type === GET_USER_LIST_SUCESSFUL){
        let userList = action.userList
        return userList;
    }else {
        return state;
    }
}
export const combineMsgReducer = (msg = defaultCombineMsg , action) => {
    if(action.type === COMBINE_MESSAGE){
        let newMsg = action.msg;
        let msgCombine = [...msg , newMsg];
        return msgCombine;
    }else {
        return msg;
    }
}

export const getAllChatSuccessfulReducer = (state = defaultMsgArr , action) => {
    if(action.type === GET_ALL_CHAT_SUCESSFUL){
        let msg = action.msg
        let arr = []
        if(msg)  arr = [...state , msg]
        return arr;
    }else {
        return state;
    }
}

export const getPrivateChatSuccessfulReducer = (state = defaultPrivateMsgArr , action) => {
    if(action.type === GET_PRIVATE_CHAT_SUCESSFUL){
        let msg = action.msg
        let arr = []
        if(msg)  arr = [...state , msg]
        return arr;
    }else {
        return state;
    }
}






