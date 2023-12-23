import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { stringAvatar } from '../Config/AvatarControllers';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function ShowChats({ name, email, lastMessage, isSearched, handleClick, id, users }) {
    const selectedChat = useSelector(state => state.selectedChat);
    const user = useSelector(state => state.user);
    const trimMessage = (m) => {
        const x = m.slice(m, 17);
        return x;
    }
    const getTime = (date) => {
        const d = new Date(date);
        const hours = d.getHours();
        const h = hours - 12;
        const minutes = d.getMinutes();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const todayDate = new Date();
        if (todayDate.getMonth() + 1 === month && todayDate.getFullYear() === year) {
            const d = todayDate.getDate();
            if (d === day) {
                if(hours===0){
                    return `12 : ${minutes < 10 ? "0" : ""}${minutes} am`;
                }
                if (h > 0) {

                    return `${h < 10 ? "0" : ""}${h} : ${minutes < 10 ? "0" : ""}${minutes} pm`;
                }
                return `${hours < 10 ? "0" : ""}${hours} : ${minutes < 10 ? "0" : ""}${minutes} am`;
            }
            if (d === day + 1) {
                return `Yesterday`

            }
        }
        return `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year}`;
    }
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
                border: id !== selectedChat ? "none" : "0.5px solid #555",
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

                    lastMessage ? (lastMessage.iscode ?
                        <Typography sx={{ fontSize: "medium", color: "#aaa", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "250px" }}>
                            <Stack
                                sx={{
                                    width: "70%",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    overflowX: "hidden",
                                }}
                            >
                                {lastMessage.sender._id === user._id &&
                                    <Stack
                                        sx={{
                                            width: "20px",
                                            height: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginRight: "10px",
                                        }}>
                                        {
                                            lastMessage.readBy.length === users.length ?
                                                <VerifiedIcon sx={{ color: "#16FF00", fontSize: "large" }} /> :
                                                <DoneAllIcon sx={{ color: "#aaa", fontSize: "large" }} />
                                        }
                                    </Stack>}
                                    {trimMessage(lastMessage.code.title+" Code")}{(lastMessage.code.title.length + "Code") > 12 && "..."}
                            </Stack>
                            <Stack sx={{ marginLeft: "5px", fontSize: "small" }}>{getTime(lastMessage.createdAt)}</Stack>
                        </Typography>
                        :
                        <Typography sx={{ fontSize: "medium", color: "#aaa", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "250px" }}>
                            <Stack
                                sx={{
                                    width: "70%",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    overflowX: "hidden",
                                }}
                            >
                                {lastMessage.sender._id === user._id &&
                                    <Stack
                                        sx={{
                                            width: "20px",
                                            height: "100%",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginRight: "10px",
                                        }}>
                                        {
                                            lastMessage.readBy.length === users.length ?
                                                <VerifiedIcon sx={{ color: "#16FF00", fontSize: "large" }} /> :
                                                <DoneAllIcon sx={{ color: "#aaa", fontSize: "large" }} />
                                        }
                                    </Stack>}
                                {trimMessage(lastMessage.message)}{lastMessage.message.length > 12 && "..."}
                            </Stack>
                            <Stack sx={{ marginLeft: "5px", fontSize: "small" }}>{getTime(lastMessage.createdAt)}</Stack>
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
