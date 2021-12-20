import { authActionTypes } from "./authActionTypes";
import { isPayloadDefined } from "../generalUtils";

const initialState = {
    loginStatus: null,
    currentUser: null
};

export function authReducer(currState = initialState, action: any) {
    switch (action.type) {
        case authActionTypes.set_login_status:
            return {
                ...currState,
                loginStatus: isPayloadDefined(action.payload)
            };


        case authActionTypes.attempt_login:
            return {
                ...currState,
                loginStatus: isPayloadDefined(action.payload),
                currentUser: isPayloadDefined(action.payload) ? action.payload : null
            };



        case authActionTypes.attempt_signup:

            return {
                ...currState,
                loginStatus: isPayloadDefined(action.payload),
                currentUser: isPayloadDefined(action.payload) ? action.payload : null
            };

            
        case authActionTypes.purge_state:
            return initialState;


        default:
            return currState;
    }
}