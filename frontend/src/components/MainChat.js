import { Avatar, Button, CircularProgress, IconButton, InputAdornment, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherIndex } from '../Config/ChatControllers';
import { stringAvatar } from '../Config/AvatarControllers';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessagesLoader from '../Loaders/MessagesLoader';
import { addMessage, selectChat, setChats, setFolder, showSnack } from '../features/login/loginSlice';
import { getBorderBottomRadius, getBorderTopRadius, getDate, getShowDate, sendMessage } from '../Config/MessagesControllers';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import VerifiedIcon from '@mui/icons-material/Verified';
import MonacoEditor from './MonacoEditor';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import CopyToClipboard from '../Config/CopyToClipboard';
import SaveIcon from '@mui/icons-material/Save';
import { saveTempFile } from '../Config/EditorControllers';
import { useNavigate } from 'react-router-dom';

export default function MainChat({ socket }) {
  const stackRef = useRef();
  const selectedChat = useSelector(store => store.selectedChat);
  const user = useSelector(store => store.user);
  const messagesLoading = useSelector(store => store.messagesLoading);
  const selectedChatMessages = useSelector(store => store.selectedChatMessages);
  const isTyping = useSelector(store => store.isTyping);
  const navigate = useNavigate();

  const [showChatDetails, setShowChatDetails] = useState(false);

  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    message: "",
    chat: selectedChat,
    iscode: false,
    code: {
      language: "cpp",
      code: "Dummy code",
      title: "Dummy title"
    }
  });
  const [sendingMessage, setSendingMessage] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  const handleChange = (evt) => {
    setMessage({ ...message, [evt.target.name]: evt.target.value });
  }

  const addMessageFunction = (message) => {
    dispatch(addMessage({ message: message }));
  }

  const handleClick = () => {
    dispatch(selectChat({ selectedChat: null }));
  }

  const setShowSnackFunction = (message, severity) => {
    dispatch(showSnack({
      message: message,
      severity: severity
    }))
  }

  const getChatsFunction = (chats) => {
    dispatch(setChats({ chats: chats }))
  }

  const sendMessageFunction = () => {
    if (message.message !== "") {
      setSendingMessage(true);
      const m = message;
      setMessage({ ...message, message: "" });
      sendMessage(m, addMessageFunction, setShowSnackFunction, setSendingMessage, selectedChat, socket, getChatsFunction);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessageFunction();
    }
  }

  const getTime = (date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const h = hours - 12;
    const minutes = d.getMinutes();
    if (hours === 0) {
      return `12 : ${minutes < 10 ? "0" : ""}${minutes} am`;
    }
    if (h > 0) {

      return `${h < 10 ? "0" : ""}${h} : ${minutes < 10 ? "0" : ""}${minutes} pm`;
    }
    return `${hours < 10 ? "0" : ""}${hours} : ${minutes < 10 ? "0" : ""}${minutes} am`;
  }

  const trimMessage = (m) => {
    const x = m.slice(m, 17);
    return x;
  }

  const handleCopy = (code) => {
    CopyToClipboard(code);
    setShowSnackFunction("Copied", "success");
  }

  const handleCodeSave = (m) => {
    setLoadingSave(true);
    const code = {
      code: m.code.code,
      language: m.code.language,
      title: m.code.title
    }
    saveTempFile(user.defaultfolder, code, setShowSnackFunction, navigate);
    dispatch(setFolder({ folder: null }));
  }

  const scrollToBottom = () => {
    if (stackRef.current) {
      stackRef.current.scrollTop = stackRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChatMessages])

  const images = {
    javascript: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
    cpp: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
    java: "https://cdn-icons-png.flaticon.com/256/226/226777.png",
    python: "https://cdn-icons-png.flaticon.com/512/919/919852.png",
    plaintext: "https://cdn-icons-png.flaticon.com/512/2306/2306185.png"
  }

  return (
    <Stack
      sx={{
        width: { xs: "95%", lg: "72%" },
        height: "97%",
        marginLeft: "5px",
        backgroundColor: "#222",
        border: "1px solid #444",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        display: selectedChat ? "flex" : { xs: "none", lg: "flex" }
      }}
    >
      {!selectedChat ? <Typography
        sx={{
          fontSize: "xx-large",
          color: "#aaa"
        }}
      >
        Click on the chat to view the Messages...
      </Typography> : messagesLoading ? <MessagesLoader /> :
        <Stack
          sx={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              height: "12%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#111",
              borderBottom: "1px solid #555",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <IconButton
              sx={{
                marginLeft: "10px",
                color: '#fff',
                display: { sm: "flex", lg: "none" }
              }}
              onClick={handleClick}
            >
              <ArrowBackIcon sx={{ fontSize: "xx-large" }} />
            </IconButton>
            <Stack
              sx={{
                flexDirection: "row",
                width: "400px",
                height: "70px",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  width: "100px",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Avatar
                  id="avatar-button"
                  style={{ color: "#fff", fontSize: "x-large", width: 50, height: 50 }}
                  {...stringAvatar(!selectedChat.isgroupchat ?
                    selectedChat.users[getOtherIndex(selectedChat.users, user)].name
                    :
                    selectedChat.chatname)}
                />
              </Stack>
              <Stack
                sx={{
                  fontSize: "x-large",
                  color: "#ddd",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "column"
                }}
              >
                {!selectedChat.isgroupchat ?
                  selectedChat.users[getOtherIndex(selectedChat.users, user)].name
                  :
                  selectedChat.chatname
                }
                {isTyping.status && <Stack
                  sx={{
                    fontSize: "large",
                    color: "#ddd"
                  }}
                >
                  typing...
                </Stack>}
              </Stack>
            </Stack>
            <Stack
              sx={{
                width: "100px",
                height: "70px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button color='success' onClick={() => setShowChatDetails(true)}>
                <InfoIcon sx={{ fontSize: "xx-large", color: "#fff" }} />
              </Button>
            </Stack>
          </Stack>
          <Stack
            sx={{
              height: "88%",
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flex: 1
                }}
              >
                <Stack
                  ref={stackRef}
                  sx={{
                    height: "495px",
                    width: "100%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflow: "scroll",
                    backgroundColor: "#333",
                    flexDirection: "column"
                  }}
                >
                  {selectedChatMessages.length === 0 &&
                    <Stack
                      sx={{
                        width: "95%",
                        height: "100%",
                        color: "#999",
                        fontSize: "large",
                        marginBottom: "5px",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        sx={{
                          width: { sm: "100%", lg: "50%" },
                          height: "40px",
                          backgroundColor: "#222",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "15px"
                        }}
                      >
                        Start Your chatting Journey, with Codeverse!!
                      </Stack>
                    </Stack>}
                  {selectedChatMessages.map((m, ind) => {

                    return <>
                      {getShowDate(selectedChatMessages, ind)
                        &&
                        <Stack
                          sx={{
                            color: "#ddd",
                            backgroundColor: "#222",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "10px",
                            marginTop: ind === 0 ? "1px" : "15px",
                            padding: "8px 15px",
                            fontSize: "large",
                            marginBottom: "10px"
                          }}
                        >
                          {getDate(m.createdAt).date}
                        </Stack>}
                      <Stack
                        sx={{
                          width: "95%",
                          justifyContent: m.sender._id === user._id ? "flex-end" : "flex-start",
                          alignItems: "flex-end",
                          flexDirection: "row",
                        }}
                      >
                        {m.sender._id !== user._id
                          &&
                          <Stack
                            sx={{
                              width: "50px",
                              height: "50px",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "5px"
                            }}
                          >
                            {getBorderBottomRadius(selectedChatMessages, ind) === 8 && <Avatar
                              id="avatar-button"
                              style={{ color: "#fff", fontSize: "medium", width: 40, height: 40 }}
                              {...stringAvatar(!selectedChat.isgroupchat ?
                                selectedChat.users[getOtherIndex(selectedChat.users, user)].name
                                :
                                selectedChat.chatname)}
                            />}
                          </Stack>
                        }
                        <Stack
                          sx={{
                            backgroundColor: m.sender._id === user._id ? "#3559E0" : "#379237",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            color: "#fff",
                            fontSize: "larger",
                            borderTopLeftRadius: `${getBorderTopRadius(selectedChatMessages, ind)}px`,
                            borderTopRightRadius: `${getBorderTopRadius(selectedChatMessages, ind)}px`,
                            borderBottomRightRadius: `${getBorderBottomRadius(selectedChatMessages, ind)}px`,
                            borderBottomLeftRadius: `${getBorderBottomRadius(selectedChatMessages, ind)}px`,
                            maxWidth: "50%",
                            flexWrap: "wrap",
                            marginBottom: "5px",
                            minWidth: m.iscode ? "50%" : "50px",
                            paddingTop: "8px",
                            paddingLeft: "10px",
                            paddingBottom: "8px",
                            paddingRight: "10px"
                          }}
                        >
                          <Stack
                            sx={{
                              minWidth: m.iscode ? "100%" : "150px",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              borderRadius: "5px",
                              flexDirection: "column"
                            }}
                          >
                            {!m.iscode
                              ?
                              m.message
                              :
                              <Stack
                                sx={{
                                  width: "100%",
                                  height: "350px",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }}
                              >
                                <Stack
                                  sx={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    height: "40px"
                                  }}
                                >
                                  <Stack
                                    sx={{
                                      width: "200px",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                      marginLeft: "5px",
                                      marginRight: "3px",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <img src={
                                      (m.code.language === "plaintext" && images.plaintext) ||
                                      (m.code.language === "javascript" && images.javascript) ||
                                      (m.code.language === "python" && images.python) ||
                                      (m.code.language === "java" && images.java) ||
                                      (m.code.language === "cpp" && images.cpp)
                                    }
                                      style={{
                                        height: "30px",
                                        width: "30px",
                                        marginRight: "5px"
                                      }}
                                      alt=""
                                    />
                                    {
                                      trimMessage(m.code.title + "." + ((m.code.language === "plaintext" && "txt") ||
                                        (m.code.language === "javascript" && "js") ||
                                        (m.code.language === "python" && "py") ||
                                        (m.code.language === "java" && "java") ||
                                        (m.code.language === "cpp" && "cpp")))
                                    }
                                    {
                                      m.code.title + "." + ((m.code.language === "plaintext" && "txt") ||
                                        (m.code.language === "javascript" && "js") ||
                                        (m.code.language === "python" && "py") ||
                                        (m.code.language === "java" && "java") ||
                                        (m.code.language === "cpp" && "cpp")).length > 17 && "..."
                                    }
                                  </Stack>
                                  <Stack
                                    sx={{ flexDirection: "row" }}
                                  >
                                    <Stack
                                      sx={{
                                        width: "50px",
                                        height: "100%",
                                      }}
                                    >
                                      <IconButton onClick={() => handleCopy(m.code.code)}>
                                        <FileCopyIcon sx={{ color: "#fff" }} />
                                      </IconButton>
                                    </Stack>
                                    {m.sender._id !== user._id && <Stack
                                      sx={{
                                        width: "50px",
                                        height: "100%",
                                        justifyContent: "flex-end",
                                        alignItems: "center"
                                      }}
                                    >
                                      {
                                        !loadingSave ?
                                          <IconButton onClick={() => handleCodeSave(m)} >
                                            <SaveIcon sx={{ color: "#fff" }} />
                                          </IconButton> :
                                          <CircularProgress size="25px" color='secondary' />
                                      }
                                    </Stack>}
                                  </Stack>
                                </Stack>
                                <Stack
                                  sx={{
                                    width: "100%",
                                    height: "320px",
                                    borderRadius: "5px"
                                  }}
                                >
                                  <MonacoEditor startCode={m.code.code} lang={m.code.language} />
                                </Stack>
                              </Stack>
                            }
                            <Typography
                              sx={{
                                fontSize: "small",
                                color: "#ddd",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                paddingRight: "5px",
                                marginTop: "5px",
                              }}>
                              {m.sender._id === user._id && <Stack
                                sx={{
                                  width: "20px",
                                  height: "100%",
                                  justifyContent: "flex-end",
                                  alignItems: "flex-end",
                                  marginRight: "6px"
                                }}>
                                {
                                  m.readBy.length === selectedChat.users.length ?
                                    <VerifiedIcon sx={{ color: "#16FF00", fontSize: "large" }} /> :
                                    <DoneAllIcon sx={{ color: "#aaa", fontSize: "large" }} />
                                }
                              </Stack>}
                              {getTime(m.createdAt)}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </>
                  })}
                </Stack>
              </Stack>
              <Stack
                sx={{
                  width: "95%",
                  marginBottom: "10px",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  maxHeight: "300px",
                  overflow: "hidden",
                  marginTop: "15px",
                  justifyContent: "flex-end"
                }}
              >
                <TextField
                  value={message.message}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  name='message'
                  color='success'
                  placeholder='type your message here..'
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
                      <InputAdornment position="start">
                        <IconButton onClick={sendMessageFunction}>
                          {!sendingMessage ? <SendIcon sx={{ fontSize: "xx-large", color: '#fff' }} /> :
                            <CircularProgress color='success' />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton >
                          <CodeIcon sx={{ fontSize: "xx-large", color: '#fff' }} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      }
      {selectedChat && <Modal
        open={showChatDetails}
        onClose={() => setShowChatDetails(false)}
      >
        <Stack sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: "#333",
          border: '1px solid #222',
          boxShadow: 24,
          p: 4,
        }}>
          <Stack
            sx={{
              flexDirection: "row",
              width: "400px",
              height: "70px",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                width: "100px",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Avatar
                id="avatar-button"
                style={{ color: "#fff", fontSize: "xx-large", width: 70, height: 70 }}
                {...stringAvatar(!selectedChat.isgroupchat ?
                  selectedChat.users[getOtherIndex(selectedChat.users, user)].name
                  :
                  selectedChat.chatname)}
              />
            </Stack>
            <Stack
              sx={{
                fontSize: "xx-large",
                color: "#ddd",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column"
              }}
            >
              {!selectedChat.isgroupchat ?
                selectedChat.users[getOtherIndex(selectedChat.users, user)].name
                :
                selectedChat.chatname
              }
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              marginTop: "20px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Stack
              sx={{
                fontSize: "x-large",
                color: "#ddd",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column"
              }}
            >
              {!selectedChat.isgroupchat ?
                "Email: -"
                :
                "Created On: -"
              }
            </Stack>
            <Stack
              sx={{
                fontSize: "x-large",
                color: "#ddd",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column"
              }}
            >
              {!selectedChat.isgroupchat ?
                selectedChat.users[getOtherIndex(selectedChat.users, user)].email
                :
                getDate(selectedChat.createdAt).date
              }
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              marginTop: "15px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button variant='contained' color="error" onClick={()=>setShowChatDetails(false)}>Close</Button>
          </Stack>
        </Stack>
      </Modal>}
    </Stack>
  )
}
