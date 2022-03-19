import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../actions/userActions';

import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userState = useSelector(state => state.user);

    const handleLogin = e => {
        e.preventDefault();

        dispatch(login({ email, password }));
    }

    if(userState.isLogged) return <Redirect to="/" />

    return(
        <div className="Login">
            <form onSubmit={ handleLogin }>
                <input type="email" placeholder="אימייל" onChange={ e => setEmail(e.target.value) } />
                <input type="password" placeholder="סיסמה" onChange={ e => setPassword(e.target.value) } />
                <button type="submit">התחבר</button>
            </form>
            <h3>לא רשום? <Link to="/signup" className="link">הרשם</Link></h3>
            { userState.errorMessage !== '' && <div className="errors">
                <ul>
                    <li>{ userState.errorMessage }</li>
                </ul>
            </div> }
        </div>
    )
}

export default Login;