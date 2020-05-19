

export const getTotalUserService = (io) => {
    try {
        return new Promise(resolve => {
            io.on("totalUser", data => resolve(data));
        });
    } catch (error) {
        console.log(error);
    }
}


export const getUserList = (io) => {
    try {
        return new Promise(resolve => {
            io.on("sendUserList", resolve);
        });
    } catch (error) {
        console.log(error);
    }
}

export const sendMessage = (io, e, from) => {
    try {
        io.emit("message", { content: e, from: from });
    } catch (error) {
        console.log(error);
    }
}

export const sendPrivateMessage = (io, e, from,userName, to) => {
    try {
        io.emit("privateMessage", { content: e, from: from, userName:userName , to: to });
    } catch (error) {
        console.log(error);
    }
}

export const getPrivateMessage = (io) => {
    try {
        return new Promise(resolve => {
            io.on("sendBackPrivateMessage", resolve);
        })
    } catch (error) {
        console.log(error);
    }
}


export const getMessage = (io) => {
    try {
        return new Promise(resolve => {
            io.on("sendBackMessage", resolve);
        });
    } catch (error) {
        console.log(error);
    }
}


