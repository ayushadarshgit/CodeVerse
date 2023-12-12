import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'

export default function ShowChats({ name, email, lastMessage, isSearched, handleClick, id }) {
    function stringToColor(string) {
        let hash = 0;
        let i;
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                width: 56,
                height: 56,
                marginLeft: "5px"
            },
            children: `${name.split(" ")[0][0]}`,
        };
    }
    return (
        <Stack
            sx={{
                backgroundColor: "#111",
                marginTop: "10px",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                width: "95%"
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
                {isSearched && <Typography sx={{ fontSize: "medium", color: "#aaa" }}>{email}</Typography>}
                {lastMessage ? (lastMessage.isCode ?
                    <Typography sx={{ fontSize: "medium", color: "#aaa" }}>{lastMessage.code.title}</Typography>
                    :
                    <Typography>{lastMessage.message}</Typography>) : (
                        <Typography sx={{ fontSize: "medium", color: "#aaa" }}>"No messages sent till now"</Typography>
                    )
                }
            </Stack>
        </Stack>
    )
}
