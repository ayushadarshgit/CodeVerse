import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Tooltip, tooltipClasses } from '@mui/material'
import React, { useState } from 'react'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/login/loginSlice';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        fontSize: "15px"
    },
    [`& .${tooltipClasses.tooltip}`]: {
        fontSize: "15px"
    },
}));

export default function SideNav({ highlight }) {
    const iconStyle = { color: "#fff", fontSize: "40px", cursor: "pointer" };
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(store => store.isLoggedIn);
    const user = useSelector(state => state.user);
    const openedFiles = useSelector(state => state.openedFiles);
    const openedFilesSavedCode = useSelector(state => state.openedFilesSavedCode);
    const openedFilesCurrentCode = useSelector(state => state.openedFilesCurrentCode);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleUserClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (u) => {
        navigate(u);
        setAnchorEl(null)
    }
    const handleLogout = () => {
        dispatch(logout());
    }
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
            },
            children: `${name.split(" ")[0][0]}`,
        };
    }

    const checkChange = (code, id) => {
        const cc = openedFilesCurrentCode.filter(f => f.id === id);
        return cc[0].code !== code;
    }

    const getUnsavedFilesCount = () => {
        let res = 0;
        for (let i = 0; i < openedFilesSavedCode.length; i++) {
            if (checkChange(openedFilesSavedCode[i].code, openedFilesSavedCode[i].id)) {
                res++;
            }
        }
        return res;
    }

    return (
        <Box
            sx={{
                width: "70px",
                backgroundColor: "#222",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                alignItems: "center"
            }} >
            <Box
                sx={{
                    width: "100%",
                    height: "40%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "column"
                }}
            >
                <Box borderLeft={highlight === "home" ? "3px solid blue" : "none"} backgroundColor={highlight === "home" ? "#333" : "none"}>
                    <IconButton onClick={() => handleClick("/")}>
                        <BootstrapTooltip title="Home Page" placement="right" arrow>
                            <Avatar sx={{ height: "50px", width: "50px", cursor: "pointer" }} alt="Cindy Baker" src="../icon_circle.png" />
                        </BootstrapTooltip>
                    </IconButton>
                </Box>
                <Box borderLeft={highlight === "compiler" ? "3px solid blue" : "none"} backgroundColor={highlight === "compiler" ? "#333" : "none"}>
                    <IconButton onClick={() => handleClick("/compiler")}>
                        <BootstrapTooltip title="Compiler" placement="right">
                            <PlayCircleOutlinedIcon sx={iconStyle} />
                        </BootstrapTooltip>
                    </IconButton>
                </Box>
                <Box borderLeft={highlight === "filemanager" ? "3px solid blue" : "none"} backgroundColor={highlight === "filemanager" ? "#333" : "none"}>
                    <IconButton onClick={() => handleClick("/editor")}>
                        <BootstrapTooltip title="File Manager" placement="right">
                            <FolderSharedIcon sx={iconStyle} />
                        </BootstrapTooltip>
                    </IconButton>
                </Box>
                <Box borderLeft={highlight === "messages" ? "3px solid blue" : "none"} backgroundColor={highlight === "messages" ? "#333" : "none"}>
                    <IconButton onClick={() => handleClick("/messanger")}>
                        <BootstrapTooltip title="Messages" placement="right">
                            <MessageIcon sx={iconStyle} />
                        </BootstrapTooltip>
                    </IconButton>
                </Box>
                {openedFiles.length > 0 && <Box borderLeft={highlight === "files" ? "3px solid blue" : "none"} backgroundColor={highlight === "files" ? "#333" : "none"}>
                    <IconButton onClick={() => handleClick("/files")}>
                        <Badge badgeContent={getUnsavedFilesCount()} color='success' max={10}>
                            <BootstrapTooltip title="Editor" placement="right">
                                <FileOpenIcon sx={iconStyle} />
                            </BootstrapTooltip>
                        </Badge>
                    </IconButton>
                </Box>}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "20%"
                }}
            >
                <IconButton>
                    <Badge badgeContent={0} color='error'>
                        <BootstrapTooltip title="Notifications" placement="right">
                            <NotificationsIcon sx={iconStyle} />
                        </BootstrapTooltip>
                    </Badge>
                </IconButton>
                <IconButton
                    id='nav-positioned-button'
                    aria-controls={open ? 'nav-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleUserClick}
                >
                    {isLoggedIn ? (
                        <Avatar
                            id="avatar-button"
                            style={{ cursor: "pointer" }}
                            {...stringAvatar(user.name)}
                        />
                    ) : (
                        <Avatar
                            alt="U"
                            id="avatar-button"
                            style={{ cursor: "pointer" }}
                            src="https://st4.depositphotos.com/9998432/24428/v/450/depositphotos_244284796-stock-illustration-person-gray-photo-placeholder-man.jpg"
                        />
                    )}
                </IconButton>
                <Menu
                    id="nav-positioned-menu"
                    aria-labelledby="nav-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleUserClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleUserClose}>My account</MenuItem>
                    {!isLoggedIn ?
                        <MenuItem onClick={() => handleClick("/login")}>Login</MenuItem> :
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>}
                </Menu>
            </Box>
        </Box>
    )
}
