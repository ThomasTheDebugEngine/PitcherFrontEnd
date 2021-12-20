import { authActionTypes } from "./authActionTypes";
import { registerRequsetObject } from "./authTypes";
import { setLoginStatus, attemptSignup } from "./authUtils";


export function setLoginStatusAction() {
    return async function (dispatch) {
        const response = await setLoginStatus();

        dispatch({
            type: authActionTypes.set_login_status,
            payload: response?.data ? response.data : false
        });
    };
}

export function setLoginUserAction(currentUser: any | null) {
    return {
        type: authActionTypes.attempt_login,
        payload: currentUser ? currentUser : false
    }
}

export function registerUserAction(request: registerRequsetObject) {
    return async function (dispatch) {
        const response = await attemptSignup(request);

        dispatch({
            type: authActionTypes.attempt_signup,
            payload: response?.data ? response.data : false
        });
    };
}

export function purgeUserData() {
    return {
        type: authActionTypes.purge_state
    };
}