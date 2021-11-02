import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from '../../../utils/Axios';

import './Register.css';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const isLogged = useSelector(state => state.user.isLogged);

    const handleRegister = e => {
        e.preventDefault();
        
        Axios({
            method: 'POST',
            url: '/users/register',
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
                confirmPassword
            }
        })
        .then(() => history.push('/signin'))
        .catch(err => setErrors(err.response.data.errors));

        return () => setErrors([]);
    }

    if(isLogged) return <Redirect to="/account" />

    return(
        <div className="Register">
            <form onSubmit={ handleRegister }>
                <div>
                    <input type="text" placeholder="שם פרטי" onChange={ e => setFirstName(e.target.value) } />
                    <input type="text" placeholder="שם משפחה" onChange={ e => setLastName(e.target.value) } />
                </div>
                <input type="email" placeholder="אימייל" onChange={ e => setEmail(e.target.value) } />
                <input type="text" placeholder="טלפון" onChange={ e => setPhoneNumber(e.target.value) } />
                <div>
                    <input type="password" placeholder="סיסמה" onChange={ e => setPassword(e.target.value) } />
                    <input type="password" placeholder="הקלד סיסמה שנית" onChange={ e => setConfirmPassword(e.target.value) } />
                </div>
                <button type="submit">הרשם</button>
            </form>
            <h3>כבר רשום? <Link to="/signin" className="link">התחבר</Link></h3>
            { errors.length !== 0 && <div className="errors">
                <ul>
                    { errors.map((error, index) => {
                        return <li key={ index }>{ error }</li>
                    }) }
                </ul>
            </div> }
        </div>
    )
}

export default Register;