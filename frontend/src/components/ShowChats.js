import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { stringAvatar } from '../Config/AvatarControllers';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function ShowChats({ name, email, lastMessage, isSearched, handleClick, id, users }) {
    const selectedChat = useSelector(state => state.selectedChat);
    const user = useSelector(state => state.user);
    console.log(selectedChat);
    return (
        <Stack
            sx={{
                backgroundColor: id === selectedChat ? "#333" : "#444",
                marginTop: "10px",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                width: "95%",
                border: id !== selectedChat ? "none" : "1px solid #777",
                borderRadius: "5px"
            }}
            onClick={() => handleClick(id)}
        >
            <Stack
                sx={{
                    width: "25%",
                    height: "90px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Avatar
                    id="avatar-button"
                    style={{ color: "#fff", fontSize: "xx-large" }}
                    {...stringAvatar(name)}
                />
            </Stack>
            <Stack
                sx={{
                    width: "75%",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                    height: "90px",
                }}
            >
                <Typography sx={{ fontSize: "x-large", color: "#fff" }}>{name}</Typography>
                {isSearched ? <Typography sx={{ fontSize: "medium", color: "#aaa" }}>{email}</Typography> :

                    lastMessage ? (lastMessage.isCode ?
                        <Typography sx={{ fontSize: "medium", color: "#aaa" }}>
                            {lastMessage.sender._id === user._id && <DoneAllIcon />}
                            {lastMessage.code.title}
                        </Typography>
                        :
                        <Typography sx={{ fontSize: "medium", color: "#aaa", display: "flex", flexDirection: "row" }}>
                            {lastMessage.sender._id === user._id &&
                                <Stack
                                    sx={{
                                        width: "20px",
                                        height: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "10px"
                                    }}>
                                    <DoneAllIcon color={lastMessage.readBy.length === users.length ? "primary" : "#aaa"} />
                                </Stack>}
                            {lastMessage.message}
                        </Typography>
                    )
                        :
                        (
                            <Typography sx={{ fontSize: "medium", color: "#aaa" }}>"Hey, Their I am using Codeverse"</Typography>
                        )
                }
            </Stack>
        </Stack>
    )
}
