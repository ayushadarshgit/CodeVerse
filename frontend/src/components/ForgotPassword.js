import { Button, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { useDispatch } from 'react-redux';
import { showSnack } from '../features/login/loginSlice';
import { changeForgottenPassword, sendForgotPasswordOtp } from '../Config/VerificationControllers';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ForgotPassword({ setForgotPassword }) {
    const o1 = useRef(null);
    const o2 = useRef(null);
    const o3 = useRef(null);
    const o4 = useRef(null);
    const o5 = useRef(null);
    const o6 = useRef(null);
    const emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,}$");
    const passwordRegex = new RegExp("^(?=[A-Za-z1-9@$!%*?&])[^@$!%*?&]*[A-Za-z1-9@$!%*?&]{1,}$");
    const [email, setEmail] = useState("");
    const [sendingEmail, setSendingEmail] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerifying, setOtpVerifying] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [otp, setOtp] = useState({
        "o1": "",
        "o2": "",
        "o3": "",
        "o4": "",
        "o5": "",
        "o6": "",
    });

    const dispatch = useDispatch();

    const setShowSnackFunction = (m, s) => {
        dispatch(showSnack({
            message: m,
            severity: s
        }))
    }

    const verifyEmail = async () => {
        if (!emailRegex.test(email)) {
            if (email.length === 0) {
                setShowSnackFunction("Please Enter your registered E-Mail", "error");
            } else {
                setShowSnackFunction("The email provided is Incorrect", "error");
            }
        } else {
            setSendingEmail(true);
            const res = await sendForgotPasswordOtp(email, setShowSnackFunction);
            if (res.success) {
                setOtpSent(true);
            }
            setSendingEmail(false);
        }
    }

    const handleOtpChange = (evt) => {
        if (otp[evt.target.name].length === 1 && evt.target.value !== "") return;
        setOtp({ ...otp, [evt.target.name]: evt.target.value });
        if (evt.target.value === "") {
            return;
        }
        if (evt.target.name === "o1") {
            if (o2.current) {
                o2.current.focus();
            }
        }
        if (evt.target.name === "o2") {
            if (o3.current) {
                o3.current.focus();
            }
        }
        if (evt.target.name === "o3") {
            if (o4.current) {
                o4.current.focus();
            }
        }
        if (evt.target.name === "o4") {
            if (o5.current) {
                o5.current.focus();
            }
        }
        if (evt.target.name === "o5") {
            if (o6.current) {
                o6.current.focus();
            }
        }
    }

    const handleOtpVerification = async () => {
        if (!passwordRegex.test(password)) {
            setShowSnackFunction(`Their must be one Uppercase letter, 1 special character and atleast 6 characters in the password, also their should not be any spaces`, "error");
        } else if (password !== confirmPassword) {
            setShowSnackFunction("Password and confirm password did not match", "error");
        } else {
            const o = `${otp.o1}${otp.o2}${otp.o3}${otp.o4}${otp.o5}${otp.o6}`;
            setOtpVerifying(true);
            const res = await changeForgottenPassword(email, o, password, setShowSnackFunction);
            if (res.success) {
                setForgotPassword(false);
                setShowSnackFunction("Please Login To Continue", "success");
            }
            setOtpVerifying(false);
            setOtpSent(false);
            setEmail("");
            setOtp({
                "o1": "",
                "o2": "",
                "o3": "",
                "o4": "",
                "o5": "",
                "o6": "",
            });
            setPassword("");
            setConfirmPassword("");
        }
    }

    return (
        <Stack
            sx={{
                width: "100%",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {!otpSent ?
                <>
                    <Stack
                        sx={{
                            width: "80%",
                            marginTop: "40px",
                            fontSize: "x-large",
                            color: "#ddd",
                            textDecoration: "underline",
                        }}
                    >
                        Forgot Password Form :-
                    </Stack>
                    <Stack
                        sx={{
                            width: "70%",
                            marginTop: "30px",
                            border: "0.5px solid #555",
                            borderBottom: "none"
                        }}
                    >
                        <TextField
                            required
                            label="Enter Registered Email address"
                            color='warning'
                            variant='filled'
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
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
                        />
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
                            startIcon={<ScheduleSendIcon />}
                            onClick={verifyEmail}
                            disabled={sendingEmail}
                        >
                            Send Otp
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
                            color='warning'
                            sx={{
                                height: "50px",
                                fontSize: "larger"
                            }}
                            startIcon={<LoginIcon />}
                            onClick={() => setForgotPassword(false)}
                        >
                            Go Back To Login
                        </Button>
                    </Stack>
                </>
                :
                <>
                    <Stack
                        sx={{
                            width: "80%",
                            marginTop: "30px",
                            fontSize: "larger",
                            color: "#ddd",
                            textDecoration: "underline",
                        }}
                    >
                        Enter The Otp Sent to your Email: -
                    </Stack>
                    <Stack
                        sx={{
                            width: "100%",
                            marginTop: "15px",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            height: "100px"
                        }}
                    >
                        <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#222", borderRadius: "5px" }}>
                            <TextField
                                onChange={handleOtpChange}
                                value={otp.o1}
                                name='o1'
                                inputRef={o1}
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
                            />
                        </Stack>
                        <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#222", borderRadius: "5px" }}>
                            <TextField
                                onChange={handleOtpChange}
                                value={otp.o2}
                                name='o2'
                                inputRef={o2}
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
                            />
                        </Stack>
                        <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#222", borderRadius: "5px" }}>
                            <TextField
                                onChange={handleOtpChange}
                                value={otp.o3}
                                name='o3'
                                inputRef={o3}
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
                            />
                        </Stack>
                        <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#222", borderRadius: "5px" }}>
                            <TextField
                                onChange={handleOtpChange}
                                value={otp.o4}
                                name='o4'
                                inputRef={o4}
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
                            />
                        </Stack>
                        <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#222", borderRadius: "5px" }}>
                            <TextField
                                onChange={handleOtpChange}
                                value={otp.o5}
                                name='o5'
                                inputRef={o5}
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
                            />
                        </Stack>
                        <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#222", borderRadius: "5px" }}>
                            <TextField
                                onChange={handleOtpChange}
                                value={otp.o6}
                                name='o6'
                                inputRef={o6}
                                InputLabelProps={{
                                    style: {
                                        color: '#fff',
                                    },
                                }}
                                InputProps={{
                                    style: {
                                        color: '#fff',
                                        fontSize: "20px"
                                    }
                                }}
                            />
                        </Stack>
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
                            label="Enter New Password"
                            color='warning'
                            type={!showPassword ? 'password' : 'text'}
                            variant='filled'
                            name='password'
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
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
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: "xx-large", color: '#fff' }} /> : <VisibilityIcon sx={{ fontSize: "xx-large", color: '#fff' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
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
                            label="Confirm Entered New Password"
                            color='warning'
                            type={!showConfirmPassword ? 'password' : 'text'}
                            variant='filled'
                            name='Confirm Password'
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
                                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <VisibilityOffIcon sx={{ fontSize: "xx-large", color: '#fff' }} /> : <VisibilityIcon sx={{ fontSize: "xx-large", color: '#fff' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
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
                            startIcon={<ManageAccountsIcon />}
                            onClick={handleOtpVerification}
                            disabled={
                                otp.o1.length !== 1 ||
                                otp.o2.length !== 1 ||
                                otp.o3.length !== 1 ||
                                otp.o4.length !== 1 ||
                                otp.o5.length !== 1 ||
                                otp.o6.length !== 1 ||
                                otpVerifying
                            }
                        >
                            Change Password
                        </Button>
                    </Stack>
                </>}
        </Stack >
    )
}
