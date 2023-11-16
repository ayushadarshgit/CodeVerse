import React from 'react'

export default function CompilerTopBar({ text }) {
  return (
    <div style={{ width: "100%", display: "flex", height: "8.75%", backgroundColor: "#222", justifyContent: "center", alignItems: "center" }}>
      <p style={{ fontSize: "xx-large", color: "#fff", cursor: "default" }}>
        <span style={{ fontSize: "35px", color: "#FF1700" }}>C</span>
        o
        <span style={{ color: "#219C90" }}>d</span>
        e
        <span style={{ fontSize: "35px", color: "#0079FF" }}>V</span>
        e
        <span style={{ color: "#FFBB5C" }}>r</span>
        s
        <span style={{ color: "#06FF00" }}>e </span>
        <span style={{color: "#F1EB90",borderBottom: "1px solid #F2FFE9",borderRadius: "15px"}}>
          {text}
        </span> 
      </p>
    </div>
  )
}
