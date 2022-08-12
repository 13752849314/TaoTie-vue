import {createStore} from "vuex"

const store = createStore({
    state: {
        jwt: ''
    },
    mutations: {
        JWT_COMMIT(state, jwt) {
            state.jwt = jwt
            localStorage.setItem('jwt', jwt)
        }
    }
})

export default store