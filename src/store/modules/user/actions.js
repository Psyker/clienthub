import { SET_VIEWER as SET_VIEWER_MUTATION } from './mutations';

export const SET_VIEWER = "SET_VIEWER";

export default {
    [SET_VIEWER]({ commit }, viewer) {
        commit(SET_VIEWER_MUTATION, viewer);
    }
};