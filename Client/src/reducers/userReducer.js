const INITIAL_STATE = {
    isLogged: false,
    user: null,
    errorMessage: ''
}

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATED_USER':
            return state = { isLogged: true, user: action.payload, errorMessage: '' };
        case 'LOGIN_SUCCESSFUL':
            return state = { isLogged: true, user: action.payload, errorMessage: '' };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return state = INITIAL_STATE;
        case 'AUTHENTICATION_ERROR':
            localStorage.removeItem('token');
            return { ...state, errorMessage: action.payload }
        default:
            return state;
    }
}

export default UserReducer;