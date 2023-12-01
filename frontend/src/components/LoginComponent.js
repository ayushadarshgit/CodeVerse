import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginComponent({handleClick}) {
    const [showLoginPassword,setShowLoginPassword] = useState(true);
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
                >
                    Login using Google
                </Button>
            </Stack>
        </Stack>
    )
}
