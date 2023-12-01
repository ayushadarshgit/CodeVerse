import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import CompilerTopBar from '../components/CompilerTopBar'
import TypingEffect from '../components/TypingEffect'
import LoginComponent from '../components/LoginComponent'
import SignupComponent from '../components/SignupComponent'

export default function Login() {
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
                    <img
                        src={url}
                        style={{
                            height: "100%",
                            width: "40%",
                            borderTopLeftRadius: "8px",
                            borderBottomLeftRadius: "8px",
                            border: "1px solid #ddd",
                            borderRight: "none"
                        }}
                        alt="" />

                    <Stack
                        sx={{
                            width: "60%",
                            height: "100%",
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
        </Stack>
    )
}
