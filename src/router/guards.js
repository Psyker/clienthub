import store from '../store'

export const loginGuard = (to, from, next) => {
    if (to.name === 'login' && store.state.user.isLoggedIn) {
        next({name: 'home'})
    } else {
        next()
    }
};