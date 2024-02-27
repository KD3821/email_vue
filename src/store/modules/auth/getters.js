import {
    GET_USER_ACCESS_TOKEN_GETTER,
    GET_USER_REFRESH_TOKEN_GETTER,
    IS_USER_AUTHENTICATED_GETTER
} from "@/store/storeConstants";

export default {
    [GET_USER_ACCESS_TOKEN_GETTER]: (state) => {
        return state.accessToken
    },
    [IS_USER_AUTHENTICATED_GETTER](state) {
        return !!state.accessToken
    },
    [GET_USER_REFRESH_TOKEN_GETTER]: (state) => {
        return state.refreshToken
    }
};