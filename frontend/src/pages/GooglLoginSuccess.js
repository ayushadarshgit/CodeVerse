import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { signin } from '../Config/LoginControllers';
import { useDispatch } from 'react-redux';
import { login } from "../features/login/loginSlice";

export default function GooglLoginSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const loginFuction = (user) => {
        console.log(user);
        dispatch(login({ user: user }));
    }

    const loginSuccess = async () => {
        const success = await signin(loginFuction);

        if (success) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        localStorage.setItem("codeverseUserSignInToken", token);
        if (token !== "someerroroccured") {
            loginSuccess()
        }
        // eslint-disable-next-line
    }, [navigate, location.search]);
    return (
        <div>
            This is from frontend
        </div>
    )
}
