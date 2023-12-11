import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const SnackBar = ({open,handleSnackClose,vertical,horizontal,severity,message}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
            onClose={handleSnackClose}
        >
            <Alert severity={severity} onClose={handleSnackClose} sx={{ maxWidth: "400px" }}>{message}</Alert>
        </Snackbar>
    )
}

export default SnackBar
