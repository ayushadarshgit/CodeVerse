import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginGoogle } from "../Config/LoginControllers"
import { useDispatch } from 'react-redux';
import { login } from '../features/login/loginSlice';
import { signUpUser } from '../Config/SignUpControllers';
import { showSnack } from '../features/login/loginSlice';
import SnackBar from './SnackBar';

export default function SignupComponent({ handleClick }) {
    const nameRegex = new RegExp("^[a-zA-z][a-zA-Z\\s]*[a-zA-Z]$");
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$");
    const passwordRegex = new RegExp("^(?=[A-Za-z1-9@$!%*?&])[^@$!%*?&]*[A-Za-z1-9@$!%*?&]{1,}$");

    const [showSignUpPassword, setShowSignUpPassword] = useState(true);
    const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(true);

    const [loading, setLoading] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const dispatch = useDispatch();

    const loginFuction = (user) => {
        dispatch(login({ user: user }));
    }

    const handleInputChange = (evt) => {
        setUser({ ...user, [evt.target.name]: evt.target.value });
    }

    const handleSignUp = async () => {
        setLoading(true);
        if (!nameRegex.test(user.name)) {
            dispatch(showSnack({
                message: "The name should have atleast on character and can not contain numbers and special characters",
                severity: "error",
                vertical: "top",
                horizontal: "right"
            }))
        } else if (!emailRegex.test(user.email)) {
            dispatch(showSnack({
                message: "The Entered Email is not valid",
                severity: "error",
                vertical: "top",
                horizontal: "right"
            }))
        } else if (!passwordRegex.test(user.password)) {
            dispatch(showSnack({
                message: "Their must be one Uppercase letter, 1 special character and atleast 6 characters in the password, also their show be not spaces. Also it can not end with special characters",
                severity: "error",
                vertical: "top",
                horizontal: "right"
            }))
        } else if (user.password !== confirmPassword) {
            dispatch(showSnack({
                message: "Password and confirm password must match..",
                severity: "error",
                vertical: "top",
                horizontal: "right"
            }))
        } else {
            const res = await signUpUser({ user: user, loginFuction: loginFuction });
            if (res.success) {
                dispatch(showSnack({
                    message: `Welcome, ${res.username} to Codeverse, Please verify your email To continue..`,
                    severity: "success",
                    vertical: "top",
                    horizontal: "right"
                }))
            } else {
                dispatch(showSnack({
                    message: res.message,
                    severity: "error",
                    vertical: "top",
                    horizontal: "right"
                }))
            }
        }
        setUser({
            name: "",
            email: "",
            password: ""
        });
        setConfirmPassword("");
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
                    label="Name "
                    name='name'
                    value={user.name}
                    onChange={handleInputChange}
                    color='warning'
                    variant='filled'
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
                    label="Email address"
                    color='warning'
                    value={user.email}
                    name='email'
                    onChange={handleInputChange}
                    variant='filled'
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
                    name='password'
                    onChange={handleInputChange}
                    value={user.password}
                    type={showSignUpPassword ? 'password' : 'text'}
                    variant='filled'
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
                                <IconButton onClick={() => setShowSignUpPassword(!showSignUpPassword)}>
                                    {!showSignUpPassword ? <VisibilityOffIcon sx={{ fontSize: "xx-large", color: '#fff' }} /> : <VisibilityIcon sx={{ fontSize: "xx-large", color: '#fff' }} />}
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
                    width: "70%",
                    marginTop: "20px",
                    border: "0.5px solid #555",
                    borderBottom: "none"
                }}
            >
                <TextField
                    required
                    label="Confirm Password"
                    color='warning'
                    type={showSignUpConfirmPassword ? 'password' : 'text'}
                    variant='filled'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(evt) => setConfirmPassword(evt.target.value)}
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
                                <IconButton onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}>
                                    {!showSignUpConfirmPassword ? <VisibilityOffIcon sx={{ fontSize: "xx-large", color: '#fff' }} /> : <VisibilityIcon sx={{ fontSize: "xx-large", color: '#fff' }} />}
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
                    color='success'
                    sx={{
                        height: "50px",
                        fontSize: "larger"
                    }}
                    startIcon={<FiberNewIcon />}
                    onClick={handleSignUp}
                    disabled={loading}
                >
                    Sign Up
                </Button>
            </Stack>

            <Stack
                sx={{
                    width: "65%",
                    marginTop: "20px"
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
                    onClick={handleClick}
                >
                    Already part of Codeverse
                </Button>
            </Stack>

            <Stack
                sx={{
                    width: "65%",
                    marginTop: "20px",
                    marginBottom: "40px"
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
