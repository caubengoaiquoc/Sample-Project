
import {SAVE_IO_REF, GET_TOTAL_USER , SAVE_TOTAL_USER, COMBINE_MESSAGE, GET_USER_LIST_SUCESSFUL, GET_ALL_CHAT, GET_ALL_CHAT_SUCESSFUL, GET_PRIVATE_CHAT, GET_PRIVATE_CHAT_SUCESSFUL} from "./actions";

export const saveIoRef = (io, userName) => {
    return {
        type: SAVE_IO_REF,
        io, 
        userName
    }
}

export const getTotalUser = () => {
    return {
        type: GET_TOTAL_USER,
    }
}

export const saveTotalUser = (totalUser) => {
    return {
        type: SAVE_TOTAL_USER,
        totalUser
    }
}

export const getUserListSuccessful = (userList) => {
    return {
        type: GET_USER_LIST_SUCESSFUL,
        userList
    }
}

export const combineMsg = (msg) => {
    return {
        type: COMBINE_MESSAGE,
        msg,
    }
}

export const getAllChat = () => {
    return {
        type: GET_ALL_CHAT
    }
}

export const getAllChatSuccessful = (msg) => {
    return {
        type: GET_ALL_CHAT_SUCESSFUL,
        msg
    }
}

export const getPrivateChat = () => {
    return {
        type: GET_PRIVATE_CHAT
    }
}

export const getPrivateChatSuccessful = (msg) => {
    return {
        type: GET_PRIVATE_CHAT_SUCESSFUL,
        msg
    }
}

