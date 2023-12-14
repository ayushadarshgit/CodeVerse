import { Avatar, Button, CircularProgress, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherIndex } from '../Config/ChatControllers';
import { stringAvatar } from '../Config/AvatarControllers';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessagesLoader from '../Loaders/MessagesLoader';
import { addMessage, selectChat, showSnack } from '../features/login/loginSlice';
import { getBorderBottomRadius, getBorderTopRadius, getDate, getShowDate, sendMessage } from '../Config/MessagesControllers';

export default function MainChat() {
  const selectedChat = useSelector(store => store.selectedChat);
  const user = useSelector(store => store.user);
  const messagesLoading = useSelector(store => store.messagesLoading);
  const selectedChatMessages = useSelector(store => store.selectedChatMessages);

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

  const sendMessageFunction = () => {
    setSendingMessage(true);
    sendMessage(message, addMessageFunction, setShowSnackFunction, setSendingMessage, setMessage, selectedChat);
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
              <Typography
                sx={{
                  fontSize: "x-large",
                  color: "#ddd",
                }}
              >
                {!selectedChat.isgroupchat ?
                  selectedChat.users[getOtherIndex(selectedChat.users, user)].name
                  :
                  selectedChat.chatname
                }
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: "100px",
                height: "70px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button color='success'>
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
                  sx={{
                    height: "500px",
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
                            marginTop: "15px",
                            padding: "10px 20px",
                            fontSize: "larger"
                          }}
                        >
                          {getDate(m.createdAt).date}
                        </Stack>}
                      <Stack
                        sx={{
                          width: "95%",
                          justifyContent: m.sender._id === user._id ? "flex-end" : "flex-start",
                          alignItems: "flex-start",
                          flexDirection: "row",
                          height: "30%",
                          marginTop: getBorderTopRadius(selectedChatMessages, ind) === 8 ? "20px" : "0px"
                        }}
                      >
                        {m.sender._id !== user._id
                          &&
                          <Stack
                            sx={{
                              width: "50px",
                              height: "100%",
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
                            backgroundColor: m.sender._id === user._id ? "#7752FE" : "#527853",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            fontSize: "larger",
                            padding: "8px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            borderTopLeftRadius: `${getBorderTopRadius(selectedChatMessages, ind)}px`,
                            borderTopRightRadius: `${getBorderTopRadius(selectedChatMessages, ind)}px`,
                            borderBottomRightRadius: `${getBorderBottomRadius(selectedChatMessages, ind)}px`,
                            borderBottomLeftRadius: `${getBorderBottomRadius(selectedChatMessages, ind)}px`,
                            maxWidth: "50%",
                            flexWrap: "wrap",
                            marginBottom: "5px"
                          }}
                        >
                          {m.message}
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
    </Stack>
  )
}
