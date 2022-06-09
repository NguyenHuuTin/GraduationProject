import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './Login.module.css';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

function Login(props) {
    return (
        <div className={styles.body}>
            <Routes>
                <Route path='signin' element={<SignIn/>}/>
                <Route path='signup' element={<SignUp/>}/>
            </Routes>
        </div>
    );
}

export default Login;