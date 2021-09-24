import axios from "axios"
export default {
    state: {
        user: {},
        isAuthenticated: false,
        jwt: "",
        error: [],
        orderList: [],

    },
    mutations: {
        SET_AUTHEN(state, user) {
            state.user = user
            state.isAuthenticated = true
        },
        SET_TOKEN(state, jwt) {
            state.jwt = jwt
            localStorage.setItem("id_token", jwt)
        },
        SET_ERROR(state, error) {
            state.error.push(error)
        },
        CLEAR_ERROR(state) {
            state.error = []
        },
        CLEAR_AUTHEN(state) {
            state.user = {}
            state.isAuthenticated = false
            localStorage.removeItem("id_token")
            state.jwt = ""
        },
        SET_ORDER(state, order) {
            state.orderList = order
        }
    },
    actions: {
        async login(context, credentials) {
            let creJson = JSON.stringify(credentials)
            try {
                let response = await axios.post("/login", creJson)
                const user = {
                    user_id: response.data.id,
                    credentials

                }
                context.commit("SET_AUTHEN", user)
                context.commit("SET_TOKEN", response.data.token)
            } catch (err) {
                context.commit("SET_ERROR", err.response.data)
            }
        },
        async register(context, credentials) {
            let regJson = JSON.stringify(credentials)
            try {
               let response = await axios.post("/registry", regJson)
               if (response.status == 200) {
                    return true
               }
            } catch (err) {
                context.commit("SET_ERROR", err.response.data)
            }
        },
        async checkAuthen(context) {
            let token = localStorage.getItem("id_token")
            if (token) {
                try {
                    let request = axios.create({
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    let response = await request.post("/authen")
                    context.commit("SET_AUTHEN", response.data)
                    context.commit("SET_ERROR", "")
                } catch (err) {
                    context.commit("CLEAR_AUTHEN")
                }
            }
        },
        async postOrder(context, order) {
            let orderJson = JSON.stringify(order)
            let token = localStorage.getItem("id_token")
            if (token) {
                try {
                    let request = axios.create({
                        headers: { "Authorization": `Bearer ${token}` }
                    })
                    await request.post("/orders", orderJson)

                } catch (err) {
                    console.log(err)
                }
            }
        },
        async updateBio(context, user) {
            let userJson = JSON.stringify(user)
            await axios.post("/user", userJson)
        },
        async getOrder(context) {
            let token = localStorage.getItem("id_token")
            try {
                let request = axios.create({
                    headers: { "Authorization": `Bearer ${token}` }
                })
                let payload = {
                    limit : 100,
                    stt: 1
                }
                let plJson = JSON.stringify(payload)
                let response = await request.post(`/get-order/${context.state.user.user_id}`, plJson)
                if (response.data) {
                context.commit("SET_ORDER", response.data)
                }

            } catch (err) {
                console.log(err)
            }
        }
    }
}
