import api from "@/plugins/axios"

export default {
    namespaced: true,
    state: {
        users: []
    },
    getters: {
        getUsers(state) {
            return state.users
        },
        getSortedUsersByName (state) {
            let users = [...state.users]

            let sorted = users.sort((a, b) => {
                if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                    return -1;
                }
                if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
            
            return sorted
        },
        getSortedUsersByAge (state) {
            let users = [...state.users]

            let sorted = users.filter(a => a.age >= 18).sort((a, b) => {
                if (a.age < b.age) {
                    return -1;
                }
                if (a.age > b.age) {
                    return 1;
                }
                return 0;
            })
            
            return sorted
        }
    },
    mutations: {
        setUsers(state, payload) {
            state.users = payload
        },
        updateUser(state, payload) {
            let index = state.users.indexOf(
                state.users.find(user => user.id === payload.id)
            )

            this._vm.$set(state.users, index, {...payload});
        }
    },
    actions: {
        async fetchUsers(store) {
            await api.get('/users/').then(response => {
                store.commit('setUsers', response.data)
            })
        },
        async editUser(store, { id, data }) {
            await api.put('/users/' + id, { ...data }).then(response => {
                store.commit('updateUser', response.data)
            })
        }
    },
}