import { IconButton, InputAdornment, SpeedDial, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ChatLoader from '../Loaders/ChatLoader';
import { createNewChat, fetchChats, getOtherIndex } from '../Config/ChatControllers';
import { useDispatch, useSelector } from "react-redux"
import { setChats, showSnack } from '../features/login/loginSlice';
import SnackBar from "../components/SnackBar";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getAllUsers } from '../Config/UserControllers';
import ShowChats from './ShowChats';

export default function AllChatComponent() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(state => state.user)

  const chats = useSelector(state => state.chats);

  const getChatsFunction = (chats) => {
    dispatch(setChats({ chats: chats }))
  }

  const fetchUsers = () => {
    getAllUsers(search, setProfiles, setLoading);
    setSearched(true);
  }

  const handleViewChange = () => {
    setView(!view);
  }

  const loadChats = async () => {
    const res = await fetchChats(getChatsFunction);
    if (!res.success) {
      dispatch(showSnack({
        message: res.message,
        severity: "error"
      }))
    }
    setLoading(false);
  }

  const handleChange = (evt) => {
    if (profiles.length > 0) setProfiles([]);
    setSearch(evt.target.value);
    if (searched) setSearched(false);
  }

  const createChat = async (id) => {
    setView(true);
    setLoading(true);
    const res = await createNewChat(id);
    if (res.success) {
      loadChats();
    } else {
      dispatch(showSnack({
        message: res.message,
        severity: "error"
      }))
      setLoading(false);
    }
  }

  useEffect(() => {
    loadChats();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {view ? <Stack
        sx={{
          width: "25%",
          height: "97%",
          backgroundColor: "#222",
          borderLeft: "1px solid #444",
          border: "1px solid #444",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            height: "70px",
            backgroundColor: "#111",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          <Stack
            sx={{
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              color: "#ddd",
              fontSize: "xx-large"
            }}
          >
            My Chats
          </Stack>
        </Stack>
        <Stack
          sx={{
            flex: 1,
            width: "100%",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "scroll"
          }}
        >
          {loading ?
            <ChatLoader /> : chats.length === 0 ? <Stack
              sx={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                color: "#ddd",
                fontSize: "x-large"
              }}
            >
              No Chats Found
            </Stack> : (
              <Stack
                sx={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  overflow: "scroll"
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    overflow: "scroll"
                  }}
                >
                  {chats.map(c => {
                    return <Stack sx={{ width: "100%", justifyContent: "center", alignItems: "center" }} key={c._id} >
                      {!c.isgroupchat && <ShowChats name={c.users[getOtherIndex(c.users,user)].name} isSearched={false} lastMessage={c.latestMessage} />}
                    </Stack>
                  })}
                </Stack>
              </Stack>
            )
          }
          <Stack sx={{ height: "10px", width: "100%" }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', bottom: 16, left: 385 }}
              icon={<AddOutlinedIcon sx={{ fontSize: "30px" }} />}
              onClick={handleViewChange}
            >
            </SpeedDial>
          </Stack>
        </Stack>
        <SnackBar />
      </Stack> : (
        <Stack
          sx={{
            width: "25%",
            height: "97%",
            backgroundColor: "#222",
            borderLeft: "1px solid #444",
            border: "1px solid #444",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              height: "90px",
              backgroundColor: "#333",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <Stack
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                color: "#ddd",
                fontSize: "xx-large"
              }}
            >
              <Stack
                sx={{
                  width: "95%",
                  border: "1px solid #555"
                }}
              >
                <TextField
                  required
                  label="Search User"
                  color='warning'
                  value={search}
                  onChange={handleChange}
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
                        <IconButton onClick={fetchUsers}>
                          <SearchIcon sx={{ fontSize: "xx-large", color: '#fff' }} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              flex: 1,
              width: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              overflow: "scroll"
            }}
          >
            {loading ?
              <ChatLoader /> : profiles.length === 0 ? <Stack
                sx={{
                  width: "80%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ddd",
                  fontSize: "x-large",
                  textAlign: "center"
                }}
              >
                {!searched ? "Search the name You are looking for.." : "No User Found"}
              </Stack> : (
                <Stack
                  sx={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    overflow: "scroll"
                  }}
                >
                  {profiles.map(p => {
                    return <Stack sx={{ width: "100%", justifyContent: "center", alignItems: "center" }} key={p._id}>
                      <ShowChats name={p.name} email={p.email} isSearched={true} handleClick={createChat} id={p._id} />
                    </Stack>
                  })}
                </Stack>
              )
            }
            <Stack sx={{ height: "10px", width: "100%" }}>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, left: 385 }}
                icon={<CloseIcon sx={{ fontSize: "30px" }} />}
                onClick={handleViewChange}
              >
              </SpeedDial>
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  )
}
