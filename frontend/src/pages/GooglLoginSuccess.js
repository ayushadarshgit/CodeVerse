import React, { useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function GooglLoginSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        localStorage.setItem("codeverseUserSignInToken", token);
        if(token !== "someerroroccured"){
            navigate('/')
        }
    }, [navigate, location.search]);
    return (
        <div>
            This is from frontend
        </div>
    )
}
