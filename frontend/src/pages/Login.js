import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CompilerTopBar from '../components/CompilerTopBar'
import TypingEffect from '../components/TypingEffect'
import LoginComponent from '../components/LoginComponent'
import SignupComponent from '../components/SignupComponent'
import SnackBar from '../components/SnackBar'
import { useDispatch } from 'react-redux'
import { showSnack } from '../features/login/loginSlice'

export default function Login({ redirected, component }) {
    const quotes = [
        "Write code, share wisdom. CodeVerse: Your digital legacy starts here.",
        "Code your dreams into reality. The more you code, the closer you get.",
        "Code today, inspire tomorrow. Save your genius on CodeVerse.",
        "Code is the language of innovation. Write more, speak louder.",
        "Every line tells a story. Code, share, conquer CodeVerse.",
        "In the world of programming, every line is a victory. Keep coding, keep winning.",
        "Innovate with each keystroke. CodeVerse: Where brilliance unites.",
        "Code dreams into reality. Share your journey on CodeVerse.",
        "The keyboard is your canvas. Paint the future with lines of code.",
        "Your code, your legacy. Save, share, shine on CodeVerse.",
        "Code small, dream big. Save your impact on CodeVerse.",

    ]
    const url = "https://e0.pxfuel.com/wallpapers/204/659/desktop-wallpaper-programmer-code-background-black-code.jpg"

    const [view, setView] = useState(true);

    const handleClick = () => {
        setView(!view)
    }
    const dispatch = useDispatch();

    const setShowSnackFunction = (message, severity) => {
        dispatch(showSnack({
            message: message,
            severity: severity
        }))
    }

    useEffect(() => {
        if (redirected && component === "filemanager") {
            setShowSnackFunction("Please login to see your files and folders", "warning");
        } else if (redirected && component === "messages") {
            setShowSnackFunction("Please login to see your messages", "warning");
        } else if (redirected && component === "files") {
            setShowSnackFunction("Please login to see your files", "warning");
        }
        // eslint-disable-next-line
    }, [])
    return (
        <Stack
            sx={{
                width: "100%",
                height: "100%",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                backgroundColor: "#111"
            }}
        >
            <CompilerTopBar text="( Login )" />
            <Stack
                sx={{
                    height: "90%",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "column"
                }}
            >
                <Stack
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <TypingEffect
                        words={quotes}
                        styles={{
                            color: '#C8FFD4',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '90%',
                            height: '80px',
                            fontSize: '30px',
                            padding: '2px', borderRadius: '20px',
                            margin: '5px'
                        }} />
                </Stack>
                <Stack
                    sx={{
                        width: "80%",
                        height: "75%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                    }}
                >
                    <Stack
                        sx={{
                            height: "100%",
                            width: { xs: "0%", lg: "40%" }
                        }}
                    >

                        <img
                            src={url}
                            style={{
                                height: "100%",
                                width: "100%",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                                border: "1px solid #ddd",
                                borderRight: "none"
                            }}
                            alt="" />
                    </Stack>

                    <Stack
                        sx={{
                            width: { xs: "100%", lg: "60%" },
                            height: "99.5%",
                            backgroundColor: "#333",
                            borderTopRightRadius: "8px",
                            borderBottomRightRadius: "8px",
                            border: "1px solid #aaa",
                            borderLeft: "none",
                            overflow: "scroll",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                    >
                        <Typography variant='div2' sx={{
                            fontSize: "xx-large",
                            marginTop: "10px",
                            color: "#ddd",
                            textDecoration: "underline"
                        }}>
                            {view ? "Login" : "Sign Up"} Form
                        </Typography>
                        {view ? (
                            <LoginComponent handleClick={handleClick} />
                        ) : (
                            <SignupComponent handleClick={handleClick} />
                        )}
                    </Stack>
                </Stack>
            </Stack>
            <SnackBar />
        </Stack>
    )
}
