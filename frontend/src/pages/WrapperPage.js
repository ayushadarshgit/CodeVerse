import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import SideNav from '../components/SideNav'
import Homepage from './Homepage'
import Compiler from './Compiler'
import Editor from './Editor'
import Messanger from './Messanger'
import Login from './Login'
import { useDispatch, useSelector } from 'react-redux'
import FileViewer from './FileViewer'
import io from "socket.io-client"
import { addMessage, login, setChats, setIsTyping, setNotifications, showSnack } from '../features/login/loginSlice'
import { fetchChats } from '../Config/ChatControllers'
import { signin } from '../Config/LoginControllers'

const ENDPOINT = "http://localhost:5000";
var socket = "";

export default function WrapperPage({ component }) {

  const user = useSelector(state => state.user);
  const isTyping = useSelector(state => state.isTyping);
  const selectedChat = useSelector(state => state.selectedChat);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const notifications = useSelector(state => state.notifications);

  const dispatch = useDispatch();

  const setTypingFunction = (t) => {
    dispatch(setIsTyping({ isTyping: t }));
  }

  const getChatsFunction = (chats) => {
    dispatch(setChats({ chats: chats }))
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    if (isLoggedIn) {
      socket.emit("setup", user);
      socket.on("connected", () => { });
      socket.on("typing", (userId) => {
        const t = {
          status: true,
          userId: userId
        }
        setTypingFunction({ isTyping: t });
      })
      socket.on("stop typing", () => {
        const t = {
          ...isTyping,
          status: false,
        }
        setTypingFunction({ isTyping: t });
      })
    }
  })
  useEffect(() => {
    if (isLoggedIn) {
      socket.emit("join chat", user._id);
    }
    // eslint-disable-next-line
  }, [isLoggedIn])
  useEffect(() => {
    if (isLoggedIn) {
      socket.on("message recieved", (async newMessageReceived => {
        if (selectedChat && (selectedChat._id === newMessageReceived.chat._id)) {
          dispatch(addMessage({ message: newMessageReceived }));
          fetchChats(getChatsFunction);
        } else {
          const n = notifications.filter(not => not.id === newMessageReceived.chat._id);
          if (n.length === 0) {
            dispatch(setNotifications({ notifications: [...notifications, { id: newMessageReceived.chat._id, message: newMessageReceived, count: 1 }] }));
          } else {
            const newNotifications = notifications.filter(not => not.id !== newMessageReceived.chat._id)
            dispatch(setNotifications({ notifications: [...newNotifications, { id: newMessageReceived.chat._id, message: newMessageReceived, count: n[0].count + 1 }] }));
          }
        }
      }))
    }
  })

  const loginFuction = (user) => {
    dispatch(login({ user: user }));
  }

  const loginSuccess = async () => {
    const token = localStorage.getItem("codeverseUserSignInToken");
    if (token) {
      const success = await signin(loginFuction);

      if (success) {
        dispatch(showSnack({
          message: `Welcome Back ${user.name} To Codeverse`,
          severity: "success"
        }))
      }
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      loginSuccess();
    }
    // eslint-disable-next-line
  }, [])


  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100vh", width: "100%" }}>
      <SideNav highlight={component} />
      {component === "home" && <Homepage />}
      {component === "compiler" && <Compiler />}
      {component === "filemanager" && (isLoggedIn ? <Editor /> : <Login redirected={true} component="filemanager" />)}
      {component === "messages" && (isLoggedIn ? <Messanger socket={socket} /> : <Login redirected={true} component="messages" />)}
      {component === "files" && (isLoggedIn ? <FileViewer /> : <Login redirected={true} component="files" />)}
      {component === "login" && <Login />}
    </Box>
  )
}
