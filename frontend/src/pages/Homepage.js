import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import CompilerTopBar from '../components/CompilerTopBar'
import SnackBar from '../components/SnackBar'
import CodingGif from "../utils/CodingNew.gif"
import MessageGif from "../utils/CodingGif.gif"
import TypingEffect from "../components/TypingEffect"
import CodingGif2 from "../utils/Code.gif"
import FileManager from "../utils/FileManager.gif"
import EditorGif from "../utils/vsEnvironmentSetup.gif"
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const quotes = [
    "Coding is the closest thing we have to a superpower. Don't stop honing your skills.",
    "Every line of code you write is a step closer to changing the world.",
    "The best way to predict the future is to code it.",
    "Coding is the art of turning ideas into reality, one line at a time.",
    "Embrace the bugs, for they are the stepping stones to success in coding.",
    "The only way to do great work is to love what you code.",
    "Coding is a journey, not a destination. Keep exploring.",
    "Success in coding comes to those who persevere through the toughest errors.",
    "Coding is not just about building software; it's about building a better future.",
    "Challenge yourself with new coding problems every day, and you'll become unstoppable.",
    "Your code can change the world. Keep coding, keep dreaming.",
    "Mistakes in coding are the portals to discovery. Keep making them.",
    "Coding is like art. The more you create, the more you learn, and the better you become.",
    "Coding is not a sprint; it's a marathon. Stay persistent.",
    "The future belongs to those who code it. Keep coding, and you'll shape the world.",
    "Coding is a puzzle, and you're the one solving it. Keep unlocking your potential.",
    "Don't be afraid to dream big and code even bigger.",
    "Coding is the language of the future. Don't miss out on the conversation.",
    "Coding is not about being the best; it's about being better than you were yesterday.",
    "The code you write today is the legacy you leave for tomorrow.",
  ];
  const navigate = useNavigate();
  const redirecter = (link) => {
    navigate(link);
  }
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      <CompilerTopBar text="( Home )" />
      <Stack
        sx={{
          height: "91%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <Stack
          sx={{
            height: "100%",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
            overflowY: "scroll"
          }}
        >
          <Stack
            sx={{
              width: "100%",
              height: "500px",
              color: "#fff",
              fontSize: "xx-large",
              backgroundColor: "#272727",
              borderTop: "1px solid #555",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }}
          >
            <Stack
              sx={{
                width: "100%",
                height: "80%",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Stack
                sx={{
                  height: "100%",
                  width: "60%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Stack sx={{ fontSize: "xx-large", textAlign: "center", justifyContent: "center", alignItems: "center", cursor: "default" }}>
                  <Stack >Forge exceptional Codes, To Shape Your Future!!</Stack>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "60px"
                    }}
                  >
                    <Stack
                      style={{
                        fontSize: "x-large",
                        color: "#999",
                      }}> - with </Stack>
                    <p style={{ fontSize: "45px", color: "#fff", cursor: "default", marginLeft: "20px", borderBottom: "2px solid #fff" }}>
                      <span style={{ fontSize: "50px", color: "#FF1700" }}>C</span>
                      ode
                      <span style={{ fontSize: "50px", color: "#0079FF" }}>V</span>
                      erse
                    </p>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    fontSize: "x-large",
                    color: "#aaa",
                    textAlign: "center",
                    cursor: "default"
                  }}
                >
                  Welcome to CodeVerse, your all-in-one coding haven!
                  Elevate your programming experience with seamless code compilation,
                  secure code storage, and easy access to your saved projects. Edit your code effortlessly,
                  engage in real-time chats with friends, and effortlessly share your coding masterpieces.
                  Experience efficiency redefined at CodeVerse
                  - where coding meets collaboration.
                </Stack>
              </Stack>
              <Stack
                sx={{
                  height: "100%",
                  width: "35%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                <img src={CodingGif} style={{ height: "100%", width: "90%" }} alt="" />
              </Stack>
            </Stack>
            <Stack
              sx={{
                width: "100%",
                height: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TypingEffect
                words={quotes}
                styles={{
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "95%",
                  height: "80px",
                  fontSize: "30px",
                  padding: "10px",
                  borderRadius: "20px",
                  margin: "5px",
                  cursor: "default",
                }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "80%",
              backgroundColor: "#272727",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "wrap",
              marginTop: "30px",
              marginBottom: "30px",
              padding: "30px",
              borderRadius: "10px"
            }}
          >
            <Typography
              gutterBottom variant="h2"
              component="div"
              sx={{
                fontSize: "xx-large",
                color: "#fff",
                borderBottom: "2px solid #ccc",
                cursor: "default"
              }}>
              About Us :-
            </Typography>
            <Stack
              sx={{
                width: "100%",
                height: "200px",
                justifyContent: "center",
                alignItems: "center",
                color: "#ddd",
                fontSize: "larger",
              }}
            >
              Introducing CodeVerse, an innovative and comprehensive platform meticulously
              crafted to elevate every aspect of the coding experience. At CodeVerse, we recognize
              the multifaceted needs of programmers and have developed a sophisticated ecosystem
              that seamlessly integrates a myriad of features to meet those needs. Effortlessly
              compile your code with precision, secure and organize your projects in our robust
              storage system, refine and enhance your creations through an intuitive code editing
              interface, and engage in real-time discussions with peers through our dynamic chat
              functionality. The collaborative spirit is further amplified with our efficient
              code-sharing capabilities, allowing users to seamlessly showcase their coding triumphs.
              CodeVerse is not just a platform; it is a meticulously engineered space that redefines
              the boundaries of coding, providing a unified, efficient, and inspiring environment for
              programmers to innovate, collaborate, and thrive.
            </Stack>
          </Stack>
          <Stack
            sx={{
              marginBottom: "30px",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "90%",
            }}
          >
            <Typography
              gutterBottom variant="h1"
              component="div"
              sx={{
                fontSize: "xx-large",
                color: "#fff",
                borderBottom: "2px solid #ccc",
                cursor: "default"
              }}>
              What we Offer ? :-
            </Typography>
          </Stack>
          <Stack
            sx={{
              width: "95%",
              height: "400px",
              backgroundColor: "#272727",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: "30px",
              borderRadius: "5px"
            }}
          >
            <Stack
              sx={{
                height: "400px",
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={CodingGif2} style={{ width: "350px", height: "300px", border: "1px solid #555", borderRadius: "5px" }} alt="" />
            </Stack>
            <Stack
              sx={{
                height: "100%",
                width: "65%",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "x-large",
                  color: "#eee",
                  textAlign: "center",
                  marginTop: "30px"
                }}
              >
                Craft your coding legacy one line at a time.
                Write, compile, and watch your CodeVerse journey
                unfold into a tapestry of innovation.
              </Typography>
              <Stack
                sx={{
                  marginTop: "35px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Typography
                  sx={{
                    width: "90%",
                    fontSize: "larger",
                    color: "#ddd",
                    textDecoration: "underline"
                  }}>
                  Facillitied Offered :-
                </Typography>
                <ul
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%" }}>
                    An Interactive Editor with code highlighting Based on the language To Write your codes.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    A Compiler to compile your codes written in the languages like java, python and c++.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    You can also save your written code for any further future refrence.
                  </li>
                </ul>
                <Button color='warning' onClick={() => redirecter("/compiler")}>Go to Compiler</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "95%",
              height: "400px",
              backgroundColor: "#272727",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: "30px",
              borderRadius: "5px"
            }}
          >
            <Stack
              sx={{
                height: "100%",
                width: "65%",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "x-large",
                  color: "#eee",
                  textAlign: "center",
                  marginTop: "30px"
                }}
              >
                Files are the chapters of your coding journey.
                Write with purpose, store with CodeVerse.
              </Typography>
              <Stack
                sx={{
                  marginTop: "35px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Typography
                  sx={{
                    width: "90%",
                    fontSize: "larger",
                    color: "#ddd",
                    textDecoration: "underline"
                  }}>
                  Facillitied Offered :-
                </Typography>
                <ul
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%" }}>
                    Create New Files/Folders.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    Delete Any Existing Files/Folders.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    Edit the existing files and folders.
                  </li>
                </ul>
                <Button color='warning' sx={{ marginTop: "30px" }} onClick={() => redirecter("/editor")}>Go to File Manager</Button>
              </Stack>
            </Stack>
            <Stack
              sx={{
                height: "400px",
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={FileManager} style={{ width: "350px", height: "300px", border: "1px solid #555", borderRadius: "5px" }} alt="" />
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "95%",
              height: "400px",
              backgroundColor: "#272727",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: "30px",
              borderRadius: "5px"
            }}
          >
            <Stack
              sx={{
                height: "400px",
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={MessageGif} style={{ width: "350px", height: "300px", border: "1px solid #555", borderRadius: "5px" }} alt="" />
            </Stack>
            <Stack
              sx={{
                height: "100%",
                width: "65%",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "x-large",
                  color: "#eee",
                  textAlign: "center",
                  marginTop: "30px"
                }}
              >
                In the symphony of coding, conversations are the harmonies.
                Chat with friends, share ideas, and let CodeVerse be
                your collaborative melody.
              </Typography>
              <Stack
                sx={{
                  marginTop: "35px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Typography
                  sx={{
                    width: "90%",
                    fontSize: "larger",
                    color: "#ddd",
                    textDecoration: "underline"
                  }}>
                  Facillitied Offered :-
                </Typography>
                <ul
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%" }}>
                    Search For the users Registered to Codeverse and then start chatting with them.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    An Interactive chatting experience to have a good chatting experience.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    Moreover, we also offer the users to share their codes in a very interactive manner.
                  </li>
                </ul>
                <Button color='warning' onClick={() => redirecter("/messanger")}>Go to Messenger</Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: "95%",
              height: "400px",
              backgroundColor: "#272727",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: "30px",
              borderRadius: "5px"
            }}
          >
            <Stack
              sx={{
                height: "100%",
                width: "65%",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "x-large",
                  color: "#eee",
                  textAlign: "center",
                  marginTop: "30px"
                }}
              >
                In the world of code, every edit is a brushstroke
                of brilliance. Shape your art with CodeVerse,
                your editor of innovation.
              </Typography>
              <Stack
                sx={{
                  marginTop: "5px",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Typography
                  sx={{
                    width: "90%",
                    fontSize: "larger",
                    color: "#ddd",
                    textDecoration: "underline"
                  }}>
                  Facillitied Offered :-
                </Typography>
                <ul
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                  }}>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%" }}>
                    Open as many files as you want and start editing the codes simulataneously to enhance your experience of coding.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    You can also compile the codes written in some of the languages like java, python, c++.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    Save your recently changed code. We also offer you to get back to your previous work if not happy with current one.
                  </li>
                  <li style={{ fontSize: "large", color: "#ccc", width: "60%", marginTop: "5px" }}>
                    We also offer our users to share their works with the users in their chat contacts saved on CodeVerse.
                  </li>
                </ul>
                <Button color='warning' onClick={() => redirecter("/editor")}>Open Files from file Manager to go to Editor</Button>
              </Stack>
            </Stack>
            <Stack
              sx={{
                height: "400px",
                width: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={EditorGif} style={{ width: "350px", height: "300px", border: "1px solid #555", borderRadius: "5px" }} alt="" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <SnackBar />
    </Stack >
  )
}
