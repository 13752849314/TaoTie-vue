import {createStore} from "vuex"

const store = createStore({
    state: {
        jwt: '',
        userInfo: {},
        username: ''
    },
    mutations: {
        JWT_COMMIT(state, jwt) {
            state.jwt = jwt
            localStorage.setItem('jwt', jwt)
        },
        USERNAME(state, username) {
            state.username = username
        },
        USERINFO(state, userInfo) {
            state.userInfo = userInfo
        }
    },
    getters: {
        get_username(state) {
            return state.username
        },
        get_userInfo(state) {
            return state.userInfo
        },
        get_jwt(state) {
            return state.jwt
        }
    }
})

export default store