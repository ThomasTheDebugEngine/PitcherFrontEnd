import * as config from "../../PublicEnv.json";
import axios from "axios";
import { loginRequestObject, registerRequsetObject } from "./authTypes";
import { handleNetworkErrors } from "../generalUtils";

export async function setLoginStatus() {
    try {

        const response = await axios.get(`${config.API_BASE}/login-status`);
        return response;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}

export async function attemptLogin(request: loginRequestObject) {
    try {
        return await axios.post(`${config.API_BASE}/login`, request);
    }
    catch (error) {
        handleNetworkErrors(error);
    }

}

export async function attemptSignup(request: registerRequsetObject) {
    try {
        return await axios.post(`${config.API_BASE}/register`, request);
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}

export async function logout() {
    try {
        const response = await axios.post(`${config.API_BASE}/logout`);

        if (response && response.data) {
            return response.data;
        }
        return false;
    }
    catch (error) {
        handleNetworkErrors(error);
    }
}


function stringToColor(userName: string) {
    let hash = 0;
    let i;


    for (i = 0; i < userName.length; i += 1) {
        hash = userName.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
}

export function stringAvatar(userName = "anonymous") {
    let avatarString = "";

    if (userName.indexOf(' ') >= 0) {
        avatarString = `${userName.split(' ')[0][0]}${userName.split(' ')[1][0]}`;
    }
    else {
        avatarString = `${userName[0]}${userName[1]}`;

    }

    return {
        sx: {
            width: "100%",
            height: "100%",
            bgcolor: stringToColor(userName),
        },
        children: avatarString
    };
}