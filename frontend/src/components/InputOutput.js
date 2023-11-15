import { Box } from '@mui/material';
import React, { useState } from 'react'

export default function InputOutput() {
  const [input, setInput] = useState(true);
  const [isCompiling, setIsCompiling] = useState(true);
  const [view, setView] = useState("input");
  return (
    <Box sx={{ 
      backgroundColor: "#333", 
      width: "100%", 
      height: "100%"
    }}>
      
    </Box>
  )
}
