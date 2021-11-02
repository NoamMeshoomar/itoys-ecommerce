import Axios from "../utils/Axios"

export const authenticationCheck = () => dispatch => {
    const token = localStorage.getItem('token');

    if(!token) return;

    Axios({
        method: 'GET',
        url: '/users/current-user',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    .then(res => dispatch({ type: 'SET_AUTHENTICATED_USER', payload: res.data.user }))
    .catch(() => localStorage.removeItem('token'));
}

export const login = ({ email, password }) => dispatch => {
    Axios({
        method: 'POST',
        url: '/users/login',
        data: {
            email,
            password
        }
    })
    .then(res => {
        const { token, user } = res.data;

        localStorage.setItem('token', token);

        dispatch({ type: 'LOGIN_SUCCESSFUL', payload: user });
    })
    .catch(err => dispatch({ type: 'AUTHENTICATION_ERROR', payload: err.response.data.error }));
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}