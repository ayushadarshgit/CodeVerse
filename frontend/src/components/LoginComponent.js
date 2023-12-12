import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginUser, loginGoogle } from '../Config/LoginControllers';
import { useDispatch } from 'react-redux';
import { login, showSnack } from '../features/login/loginSlice';
import { useNavigate } from 'react-router-dom';
import SnackBar from './SnackBar';


export default function LoginComponent({ handleClick }) {

    const navigate = useNavigate();

    const usernameRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$");
    const passwordRegex = new RegExp("^(?=[A-Za-z1-9@$!%*?&])[^@$!%*?&]*[A-Za-z1-9@$!%*?&]{1,}$");

    const [showLoginPassword, setShowLoginPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const dispatch = useDispatch();

    const loginFuction = (user) => {
        dispatch(login({ user: user }));
    }

    const handleChange = (evt) => {
        setUser({ ...user, [evt.target.name]: evt.target.value })
    }

    const handleLogin = async () => {
        setLoading(true);
        if (usernameRegex.test(user.username) && passwordRegex.test(user.password)) {
            const res = await loginUser({ user: user, loginFuction: loginFuction });
            if (res.success) {
                dispatch(showSnack({
                    message: `Welcome Back ${res.username}`,
                    severity: "success"
                }))
                navigate('/');
            } else {
                dispatch(showSnack({
                    message: res.message,
                    severity: "error"
                }))
            }
        } else if (usernameRegex.test(user.username)) {
            dispatch(showSnack({
                message: `Their must be one Uppercase letter, 1 special character and atleast 6 characters in the password, also their should not be any spaces`,
                severity: "error"
            }))
        } else {
            dispatch(showSnack({
                message: `The Email provided by you is not correct.`,
                severity: "error"
            }))
        }
        setLoading(false);
    }

    return (
        <Stack
            sx={{
                width: "100%",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-evenly"
            }}
        >
            <Stack
                sx={{
                    width: "70%",
                    marginTop: "20px",
                    border: "0.5px solid #555",
                    borderBottom: "none"
                }}
            >
                <TextField
                    required
                    label="Email address"
                    color='warning'
                    variant='filled'
                    value={user.username}
                    onChange={handleChange}
                    name='username'
                    InputLabelProps={{
                        style: {
                            color: '#fff',
                        },
                    }}
                    InputProps={{
                        style: {
                            color: '#fff',
                            fontSize: "20px"
                        },
                    }}
                    Input={{
                        style: {
                            color: '#fff',
                        },
                    }}
                />
            </Stack>
            <Stack
                sx={{
                    width: "70%",
                    marginTop: "20px",
                    border: "0.5px solid #555",
                    borderBottom: "none"
                }}
            >
                <TextField
                    required
                    label="Password"
                    color='warning'
                    type={showLoginPassword ? 'password' : 'text'}
                    variant='filled'
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                    InputLabelProps={{
                        style: {
                            color: '#fff',
                        },
                    }}
                    InputProps={{
                        style: {
                            color: '#fff',
                            fontSize: "20px"
                        },
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={() => setShowLoginPassword(!showLoginPassword)}>
                                    {!showLoginPassword ? <VisibilityOffIcon sx={{ fontSize: "xx-large", color: '#fff' }} /> : <VisibilityIcon sx={{ fontSize: "xx-large", color: '#fff' }} />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    Input={{
                        style: {
                            color: '#fff',
                        },
                    }}
                />
            </Stack>
            <Stack
                sx={{
                    width: "65%",
                    marginTop: "40px",
                }}
            >
                <Button
                    variant='contained'
                    color='warning'
                    sx={{
                        height: "50px",
                        fontSize: "larger"
                    }}
                    startIcon={<LoginIcon />}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    Log In
                </Button>
            </Stack>
            <Stack
                sx={{
                    width: "65%",
                    marginTop: "20px",
                }}
            >
                <Button
                    variant='contained'
                    color='success'
                    sx={{
                        height: "50px",
                        fontSize: "larger"
                    }}
                    startIcon={<FiberNewIcon />}
                    onClick={handleClick}
                >
                    New to Codeverse
                </Button>
            </Stack>
            <Stack
                sx={{
                    width: "65%",
                    marginTop: "20px",
                }}
            >
                <Button
                    variant='contained'
                    color='primary'
                    sx={{
                        height: "50px",
                        fontSize: "larger"
                    }}
                    startIcon={<GoogleIcon />}
                    onClick={loginGoogle}
                >
                    Continue using Google
                </Button>
            </Stack>
            <SnackBar />
        </Stack>
    )
}
