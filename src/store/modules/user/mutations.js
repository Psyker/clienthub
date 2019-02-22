export const SET_LOGGED_IN = "SET_LOGGED_IN";
export const SET_VIEWER = "SET_VIEWER";

export default {
    [SET_LOGGED_IN](state, loggedIn) {
        state.isLoggedIn = loggedIn;
    },
    [SET_VIEWER](state, viewer) {
        state.viewer = viewer;
    }
};
