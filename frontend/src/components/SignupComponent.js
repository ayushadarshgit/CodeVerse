import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginGoogle } from "../Config/LoginControllers"

export default function SignupComponent({ handleClick }) {
    const [showSignUpPassword, setShowSignUpPassword] = useState(true);
    const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(true);
    const fileInputRef = useRef(null);
    const [dp, setDp] = useState();

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log('Selected File:', selectedFile);
        setDp(selectedFile)
    };
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
                    width: "70%",
                    marginTop: "20px",
                    border: "0.5px solid #555",
                    height: "70px",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <Button onClick={handleButtonClick} variant='contained' color='secondary' sx={{ width: "30%" }}>Upload Dp</Button>
                <Typography sx={{ width: "50%", color: "#fff" }}>
                    {dp ? dp.name : ""}
                </Typography>
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
                    Sign Up using Google
                </Button>
            </Stack>
        </Stack>
    )
}
