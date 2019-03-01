import mutations from "./mutations";
import actions from "./actions";
import { AUTH_TOKEN } from "../../../vue-apollo"

const state = {
    isLoggedIn: localStorage.getItem(AUTH_TOKEN) !== null,
    viewer: null
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
