import { Avatar, Box, Button, CircularProgress, Modal, Stack, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
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
import { stringAvatar } from '../Config/AvatarControllers'
import { otpVerificationFunction, sendVerificationOtp } from '../Config/VerificationControllers'

const ENDPOINT = "http://localhost:5000";
var socket = "";

export default function WrapperPage({ component }) {
  const o1 = useRef(null);
  const o2 = useRef(null);
  const o3 = useRef(null);
  const o4 = useRef(null);
  const o5 = useRef(null);
  const o6 = useRef(null);

  const user = useSelector(state => state.user);
  const isTyping = useSelector(state => state.isTyping);
  const selectedChat = useSelector(state => state.selectedChat);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const notifications = useSelector(state => state.notifications);
  const [otpVerifying, setOtpVerifying] = useState(false);

  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otp, setOtp] = useState({
    "o1": "",
    "o2": "",
    "o3": "",
    "o4": "",
    "o5": "",
    "o6": "",
  });

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

      if (user && success) {
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

  const setShowSnackFunction = (message, severity) => {
    dispatch(showSnack({
      message: message,
      severity: severity
    }))
  }


  useEffect(() => {
    if (isLoggedIn) {
      if (component === "filemanager" || component === "messages" || component === "files") {
        if (user && !user.isEmailVerified) {
          sendVerificationOtp(setShowSnackFunction);
          if (o1.current) {
            o1.current.focus();
          }
          setVerifyOtp(true);
        }
      }
    }
    // eslint-disable-next-line
  }, [component, isLoggedIn, user])

  const handleOtpChange = (evt) => {
    if (otp[evt.target.name].length === 1 && evt.target.value !== "") return;
    setOtp({ ...otp, [evt.target.name]: evt.target.value });
    if (evt.target.value === "") {
      return;
    }
    if (evt.target.name === "o1") {
      if (o2.current) {
        o2.current.focus();
      }
    }
    if (evt.target.name === "o2") {
      if (o3.current) {
        o3.current.focus();
      }
    }
    if (evt.target.name === "o3") {
      if (o4.current) {
        o4.current.focus();
      }
    }
    if (evt.target.name === "o4") {
      if (o5.current) {
        o5.current.focus();
      }
    }
    if (evt.target.name === "o5") {
      if (o6.current) {
        o6.current.focus();
      }
    }
  }

  const handleOtpVerification = async () => {
    const o = `${otp.o1}${otp.o2}${otp.o3}${otp.o4}${otp.o5}${otp.o6}`;
    setOtpVerifying(true);
    const res = await otpVerificationFunction(o, setShowSnackFunction);
    if (res.success) {
      loginFuction(res.user);
      setVerifyOtp(false);
    }
    setOtpVerifying(false);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100vh", width: "100%" }}>
      <SideNav highlight={component} />
      {component === "home" && <Homepage />}
      {component === "compiler" && <Compiler />}
      {component === "filemanager" && (isLoggedIn ? <Editor /> : <Login redirected={true} component="filemanager" />)}
      {component === "messages" && (isLoggedIn ? <Messanger socket={socket} /> : <Login redirected={true} component="messages" />)}
      {component === "files" && (isLoggedIn ? <FileViewer /> : <Login redirected={true} component="files" />)}
      {component === "login" && <Login />}
      {user && <Modal
        open={verifyOtp}
      >
        <Stack sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: "#111",
          border: '1px solid #fff',
          boxShadow: 24,
          p: 2,
          borderRadius: "5px",
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
                style={{ color: "#fff", fontSize: "x-large", width: 50, height: 50 }}
                {...stringAvatar(user.name)}
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
              {user.name},
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "100%",
              marginTop: "20px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Stack
              sx={{
                fontSize: "large",
                color: "#ddd",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
              }}
            >
              Please verify your Email to continue accessing your {component}.
            </Stack>
            <Stack
              sx={{
                fontSize: "large",
                color: "#ddd",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                marginTop: "10px"
              }}
            >
              You can verify your Email click on the link sent to your registered address Email i.e. to the Email, then please refresh the page to continue :-
            </Stack>
            <Stack
              sx={{
                fontSize: "x-large",
                color: "#ddd",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "80%",
                marginTop: "10px",
                textDecoration: "underline",
              }}
            >
              "{user.email}"
            </Stack>
          </Stack>
          <Stack
            sx={{
              fontSize: "large",
              color: "#ddd",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
              marginTop: "15px"
            }}
          >
            You can also verify it by <span style={{ fontSize: "larger", textDecoration: "underline", marginLeft: "5px", marginRight: "5px" }}>Entering the otp sent along</span>:-
          </Stack>
          <Stack
            sx={{
              width: "100%",
              marginTop: "15px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: "100px"
            }}
          >
            <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#333", borderRadius: "5px" }}>
              <TextField
                onChange={handleOtpChange}
                value={otp.o1}
                name='o1'
                inputRef={o1}
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
                }}
              />
            </Stack>
            <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#333", borderRadius: "5px" }}>
              <TextField
                onChange={handleOtpChange}
                value={otp.o2}
                name='o2'
                inputRef={o2}
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
                }}
              />
            </Stack>
            <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#333", borderRadius: "5px" }}>
              <TextField
                onChange={handleOtpChange}
                value={otp.o3}
                name='o3'
                inputRef={o3}
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
                }}
              />
            </Stack>
            <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#333", borderRadius: "5px" }}>
              <TextField
                onChange={handleOtpChange}
                value={otp.o4}
                name='o4'
                inputRef={o4}
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
                }}
              />
            </Stack>
            <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#333", borderRadius: "5px" }}>
              <TextField
                onChange={handleOtpChange}
                value={otp.o5}
                name='o5'
                inputRef={o5}
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
                }}
              />
            </Stack>
            <Stack sx={{ height: "60px", width: "45px", backgroundColor: "#333", borderRadius: "5px" }}>
              <TextField
                onChange={handleOtpChange}
                value={otp.o6}
                name='o6'
                inputRef={o6}
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
                }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "95%",
              marginTop: "10px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {!otpVerifying ? <Button
              onClick={handleOtpVerification}
              variant='contained'
              color='warning'
              disabled={
                otp.o1.length !== 1 ||
                otp.o2.length !== 1 ||
                otp.o3.length !== 1 ||
                otp.o4.length !== 1 ||
                otp.o5.length !== 1 ||
                otp.o6.length !== 1
              }
            >
              Verify Otp
            </Button> : <CircularProgress color='warning' />}
          </Stack>
          <Stack
            sx={{
              width: "100%",
              marginTop: "20px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Stack
              sx={{
                fontSize: "large",
                color: "#ddd",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
              }}
            >
              Thank You...
            </Stack>
            <Stack
              sx={{
                fontSize: "large",
                color: "#ddd",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "100%",
                marginTop: "10px"
              }}
            >
              Regards,
            </Stack>
            <Stack
              sx={{
                fontSize: "large",
                color: "#ddd",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                width: "100%",
                marginTop: "10px",
              }}
            >
              team <span style={{ fontSize: "x-large", color: "#fff", cursor: "default", marginLeft: "10px" }}>
                <span style={{ fontSize: "25px", color: "#FF1700" }}>C</span>
                ode
                <span style={{ fontSize: "25px", color: "#0079FF" }}>V</span>
                erse .
              </span>
            </Stack>
          </Stack>
        </Stack>
      </Modal>}
    </Box>
  )
}
