import { Avatar, Button, CircularProgress, Drawer, IconButton, InputAdornment, SpeedDial, SpeedDialAction, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MonacoEditor from "./MonacoEditor"
import { useDispatch, useSelector } from 'react-redux'
import CodeLoaders from '../Loaders/CodeLoaders';
import { addMessage, setChats, setOpenedCode, setOpenedFiles, showSnack } from '../features/login/loginSlice';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';

import SaveIcon from '@mui/icons-material/Save';
import InputOutput from './InputOutput';
import { saveFileChanges } from '../Config/EditorControllers';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { fetchChats, getOtherIndex } from '../Config/ChatControllers';
import { stringAvatar } from '../Config/AvatarControllers';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage } from '../Config/MessagesControllers';

export default function ViewCodeContent({ codeLoading, setCodeLoading, editorRef }) {
    const user = useSelector(state => state.user);
    const openedView = useSelector(state => state.openedView);
    const openedCode = useSelector(state => state.openedCode);
    const openedFiles = useSelector(state => state.openedFiles);
    const openedFilesSavedCode = useSelector(state => state.openedFilesSavedCode);
    const openedFilesCurrentCode = useSelector(state => state.openedFilesCurrentCode);

    const [openBottomDrawer, setOpenBottomDrawer] = useState(false);
    const [chatsLoading, setChatsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const chats = useSelector(state => state.chats);
    const [sendToChat, setSendToChat] = useState(-1);
    const [searchChats, setSearchChats] = useState("");
    const [showChats, setShowChat] = useState([]);
    const [sendingMessage, setSendingMessage] = useState(false);

    const dispatch = useDispatch();

    const setOpenedCodeFunction = (code) => {
        dispatch(setOpenedCode({ code: code }));
    }

    const handleChange = (id) => {
        const model = editorRef.current.getModel();
        const formattedCode = model.getValue();
        const cc = openedFilesCurrentCode.filter(f => f.id !== id);
        cc.push({ id: id, code: formattedCode });
        dispatch(setOpenedFiles({ files: openedFiles, savedCode: openedFilesSavedCode, currentCode: cc }));
    }

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const setShowSnackFunction = (message, severity) => {
        dispatch(showSnack({
            message: message,
            severity: severity
        }))
    }

    const saveChanges = () => {
        const s = openedFilesSavedCode.filter(f => f.id === openedView._id);
        const cc = openedFilesCurrentCode.filter(f => f.id === openedView._id);
        if (s[0].code !== cc[0].code) {
            const sc = openedFilesSavedCode.filter(f => f.id !== openedView._id);
            sc.push(cc[0]);
            saveFileChanges(openedView._id, cc[0].code, setShowSnackFunction);
            dispatch(setOpenedFiles({ files: openedFiles, savedCode: sc, currentCode: openedFilesCurrentCode }));
        } else {
            setShowSnackFunction("The file is up to date. No need to save", "success")
        }
    }

    const getChatsFunction = (chats) => {
        dispatch(setChats({ chats: chats }))
    }

    const loadChatsFunction = async () => {
        setChatsLoading(true);
        if (chats.length === 0) {
            const res = await fetchChats(getChatsFunction);
            if (!res.success) {
                setShowSnackFunction("Error loading the chats", "error");
            }
        }
        if (!loaded) {
            setLoaded(true);
        }
        setChatsLoading(false);
    }

    const handleSearchChatChange = (evt) => {
        setSearchChats(evt.target.value);
        setShowChat(chats.filter((c) => {
            if (c.isgroupchat) {
                return c.chatname.includes(searchChats);
            } else {
                return c.users[getOtherIndex(c.users, user)].name.includes(searchChats);
            }
        }))
    }

    const actions = [
        { icon: <SaveIcon sx={{ color: "#000" }} onClick={saveChanges} />, name: 'Save Code' },
    ];

    const addMessageFunction = (message) => {
        dispatch(addMessage({ message: message }));
    }

    const shareCode = (chat) => {
        const model = editorRef.current.getModel();
        const formattedCode = model.getValue();
        setSendingMessage(true);
        const m = {
            message: "dummy message",
            iscode: true,
            code: {
                language: openedView.language,
                code: formattedCode,
                title: openedView.filename
            }
        }
        sendMessage(m, addMessageFunction, setShowSnackFunction, setSendingMessage, chat, getChatsFunction);
        setOpenBottomDrawer(false);
    }

    const handleShare = () => {
        setOpenBottomDrawer(true);
    }

    useEffect(() => {
        setSearchChats("");
        setShowChat(chats);
    }, [chats])

    useEffect(() => {
        setCodeLoading(true);
        const f = openedFilesCurrentCode.filter(f => f.id === openedView._id);
        setOpenedCodeFunction(f[0].code);
        setCodeLoading(false);
        // eslint-disable-next-line
    }, [openedView]);
    return (
        <Stack
            sx={{
                width: "100%",
                height: "83%",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
            }}
        >
            <Stack
                sx={{
                    width: (openedView.language === "plaintext" || openedView.language === "javascript") ? "100%" : "60%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#333"
                }}
            >
                {
                    codeLoading
                        ?
                        <CodeLoaders />
                        :
                        <MonacoEditor
                            handleEditorDidMount={handleEditorDidMount}
                            lang={openedView.language}
                            startCode={openedCode}
                            onChange={handleChange}
                        />
                }
                {
                    !codeLoading
                    &&
                    (
                        openedView.language === "plaintext"
                        ||
                        openedView.language === "javascript"
                    )
                    &&
                    <SpeedDial
                        ariaLabel="SpeedDial controlled open example"
                        sx={{ position: 'absolute', bottom: 15, right: 25 }}
                        icon={<SpeedDialIcon fontSize="large" openIcon={<EditIcon />} />}
                        direction='left'
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                color='#000'
                            />
                        ))}
                    </SpeedDial>}
            </Stack>
            {
                openedView.language !== "plaintext"
                &&
                openedView.language !== "javascript"
                &&
                <Stack
                    sx={{
                        height: "100%",
                        width: "39.5%",
                    }}
                >
                    <InputOutput editorRef={editorRef} lang={openedView.language} handleShare={handleShare} />
                </Stack>
            }
            <Drawer
                anchor='bottom'
                open={openBottomDrawer}
                onClose={() => setOpenBottomDrawer(false)}
            >
                <Stack
                    sx={{
                        width: "100%",
                        backgroundColor: "#222",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        minHeight: "300px",
                        alignItems: "center",
                        height: loaded ? "65vh" : "",
                    }}
                >
                    <Stack
                        sx={{
                            width: "90%",
                            height: loaded ? "60vh" : "200px",
                            border: "1px solid #333",
                            borderRadius: "5px",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {!loaded ? (!chatsLoading ? <Button
                            sx={{
                                width: "50%",
                                height: "45px",
                                fontSize: "larger"
                            }}
                            startIcon={<AttachEmailIcon />}
                            variant='contained'
                            color='secondary'
                            onClick={loadChatsFunction}
                        >
                            Share Using Code Verse Mesenger
                        </Button> :
                            <CircularProgress color='secondary' />
                        ) :
                            <Stack
                                sx={{
                                    width: "100%",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    height: "90%"
                                }}
                            >
                                <Stack
                                    sx={{
                                        width: "90%",
                                        marginTop: "5px",
                                        marginBottom: "5px"
                                    }}
                                >
                                    <Stack
                                        sx={{
                                            marginTop: "10px",
                                            width: "300px",
                                            backgroundColor: "#333",
                                            border: "1px solid #555",
                                            borderRadius: "5px"
                                        }}
                                    >
                                        <TextField
                                            label="Search Chat"
                                            color='warning'
                                            required
                                            value={searchChats}
                                            onChange={handleSearchChatChange}
                                            type='text'
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
                                                    <InputAdornment position="end">
                                                        <SearchIcon sx={{ fontSize: "x-large", color: '#fff' }} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Stack>
                                </Stack>

                                <Stack
                                    sx={{
                                        width: "95%",
                                        height: "150px",
                                        borderRadius: "10px",
                                        overflowX: "scroll",
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        marginTop: "10px"
                                    }}
                                >
                                    {showChats.map((c, ind) => {
                                        return <Stack
                                            sx={{
                                                width: "150px",
                                                height: "120px",
                                                justifyContent: "space-evenly",
                                                alignItems: "center",
                                                cursor: "pointer",
                                                marginLeft: ind > 0 ? "10px" : "0px",
                                                backgroundColor: sendToChat === ind ? "#333" : "none",
                                                borderRadius: "5px",
                                                border: sendToChat === ind ? "1px solid #444" : "none",
                                                '&:hover': {
                                                    backgroundColor: sendToChat === ind ? "#333" : "#444",
                                                },
                                            }}
                                            key={c._id}
                                            onClick={() => setSendToChat(ind)}
                                        >
                                            <Avatar
                                                id="avatar-button"
                                                style={{ color: "#fff", fontSize: "xx-large", border: "1px solid #fff" }}
                                                {...stringAvatar(c.isgroupchat ? c.chatname : c.users[getOtherIndex(c.users, user)].name)}
                                            />
                                            <Typography sx={{ color: "#fff" }}>{c.isgroupchat ? c.chatname : c.users[getOtherIndex(c.users, user)].name}</Typography>
                                        </Stack>
                                    })}
                                </Stack>
                                <Stack
                                    sx={{
                                        width: "90%",
                                        flexDirection: "row",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        height: "60px"
                                    }}
                                >
                                    {sendToChat !== -1
                                        &&
                                        (sendingMessage
                                            ?
                                            <CircularProgress />
                                            :
                                            <IconButton color="success" onClick={() => shareCode(showChats[sendToChat])} >
                                                <SendIcon sx={{ color: "#fff", fontSize: "xx-large" }} />
                                            </IconButton>)
                                    }
                                </Stack>
                            </Stack>
                        }
                    </Stack>

                </Stack>
            </Drawer>
        </Stack>
    )
}
