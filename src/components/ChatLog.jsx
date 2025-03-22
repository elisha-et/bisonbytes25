import React from "react";
import { Box, Paper, TextField, Typography } from "@mui/material";

const ChatLog = (props) => {

    return (
        <Box display="flex" flexDirection="column" flexGrow={1}>
            <Paper>
                <Typography variant="h5" p={4}>
                    Chat
                </Typography>
            </Paper>
        </Box>
    );
};

export default ChatLog;
